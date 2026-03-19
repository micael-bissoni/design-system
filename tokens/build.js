const fs = require('fs');

async function build() {
  const { default: StyleDictionary } = await import('style-dictionary');

  const sd = new StyleDictionary({
    source: ['tokens/properties/**/*.json'],
    platforms: {
      ts: {
        transformGroup: 'js',
        buildPath: 'tokens/src/lib/',
        files: [{
          destination: 'tokens.ts',
          format: 'typescript/multibrand'
        }]
      }
    }
  });

  sd.registerFormat({
    name: 'typescript/multibrand',
    format: async function ({ dictionary }) {
      // Group properties by top-level key
      const tokens = dictionary.tokens;

      // Core tokens (spacing, font, radius)
      const coreKeys = ['spacing', 'font', 'radius'];
      const coreTokens = {};
      coreKeys.forEach(key => {
        if (tokens[key]) {
          // Flatten/minify nested value objects manually for simplicity
          coreTokens[key] = minify(tokens[key]);
        }
      });

      // Brand tokens (trevvo, partner, etc.)
      const brandTokens = {};
      const excludedKeys = new Set(coreKeys);
      Object.keys(tokens).forEach(key => {
        if (!excludedKeys.has(key)) {
          brandTokens[key] = minify(tokens[key]);
        }
      });

      return `export const coreTokens = ${JSON.stringify(coreTokens, null, 2)} as const;

export const brandColors = ${JSON.stringify(brandTokens, null, 2)} as const;

export type Brand = keyof typeof brandColors;

export const designTokens = {
  ...coreTokens,
  color: brandColors.default
} as const;

export type DesignTokens = typeof designTokens;
`;
    }
  });

  await sd.buildAllPlatforms();
}

function minify(obj) {
  if (obj.value !== undefined) {
    return obj.value;
  }
  const minified = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      minified[key] = minify(obj[key]);
    }
  }
  return minified;
}

build().catch(console.error);

