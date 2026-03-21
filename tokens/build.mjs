import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import fs from 'fs';
import path from 'path';

const brands = fs.readdirSync(path.join(process.cwd(), 'tokens/properties/brands')).filter((brand) => !brand.startsWith('.'));
const platforms = fs.readdirSync(path.join(process.cwd(), 'tokens/properties/platforms')).filter((platform) => !platform.startsWith('.'));

const { androidColors, androidDimens, androidFontDimens, iosMacros, scssVariables } = formats;
const { web } = transformGroups;

function toBabelCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  return str
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''));
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

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand, platform) {
  return {
    source: [
      `tokens/properties/brands/${brand}/*.json`,
      'tokens/properties/globals/**/*.json',
      `tokens/properties/platforms/${platform}/*.json`,
    ],
    platforms: {
      web: {
        transformGroup: web,
        buildPath: `public/tokens/web/${brand}/`,
        files: [
          {
            destination: 'tokens.scss',
            format: scssVariables,
          },
        ],
      },
      ts: {
        transformGroup: 'js',
        buildPath: `public/tokens/ts/${brand}/`,
        files: [
          {
            destination: 'index.ts',
            format: 'typescript/multibrand'
          }
        ]
      },
      android: {
        transformGroup: 'android',
        buildPath: `public/tokens/android/${brand}/`,
        files: [
          {
            destination: 'tokens.colors.xml',
            format: androidColors,
          },
          {
            destination: 'tokens.dimens.xml',
            format: androidDimens,
          },
          {
            destination: 'tokens.font_dimens.xml',
            format: androidFontDimens,
          },
        ],
      },
      ios: {
        transformGroup: 'ios',
        buildPath: `public/tokens/ios/${brand}/`,
        files: [
          {
            destination: 'tokens.h',
            format: iosMacros,
          },
        ],
      },
    },
  };
}

console.log('Cleaning existing styles...');
const buildDir = path.join(process.cwd(), 'public/tokens');
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

brands.map(function (brand) {
  platforms.map(function (platform) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const sd = new StyleDictionary(getStyleDictionaryConfig(brand, platform));

    const brandTokens = {};
    sd.registerFormat({
      name: 'typescript/multibrand',
      format: async function ({ dictionary }) {
        const tokens = dictionary.tokens;
        const brandName = toBabelCase(brand)
        brandTokens[brandName] = minify(tokens)
        console.log(brandName, brandTokens[brandName])
        return `export const ${brandName} = ${JSON.stringify(brandTokens[brandName], null, 2)} as const;
        `;
      }
    });
    sd.buildPlatform(platform);

    // Copy assets if they exist for this brand
    const brandAssetsDir = path.join(process.cwd(), `tokens/properties/brands/${brand}/assets`);
    const publicBrandAssetsDir = path.join(process.cwd(), `public/tokens/${brand}/assets`);

    if (fs.existsSync(brandAssetsDir)) {
      console.log(`Copying assets for ${brand}...`);
      fs.mkdirSync(publicBrandAssetsDir, { recursive: true });
      fs.cpSync(brandAssetsDir, publicBrandAssetsDir, { recursive: true });
    }
  });
});

fs.writeFileSync(
  path.join(process.cwd(), 'tokens/src/lib/tokens.ts'),
  `${brands.map((brand) => `import { ${toBabelCase(brand)} } from '../../../public/tokens/ts/${brand}/index';`).join('\n')}
export const brands = {
${brands.map((brand) => `  '${brand}': ${toBabelCase(brand)}`).join(',\n')}
} as const;
export type Brand = keyof typeof brands;
  `,
);

console.log('\n==============================================');
console.log('\nBuild completed!');
