export const defaultBrand = {
  "button": {
    "border": {
      "radius": "4px"
    },
    "text": {
      "size": "12pt"
    },
    "height": "40px"
  },
  "color": {
    "base": {
      "black": "#000000",
      "gray": {
        "light": "#cccccc",
        "medium": "#999999",
        "dark": "#111111"
      },
      "red": "#ff0000",
      "green": "#00ff00",
      "blue": "#0000ff"
    },
    "primary": "#ea4335",
    "secondary": "#34a853",
    "tertiary": "#999999",
    "action": {
      "primary": "#ea4335",
      "secondary": "#34a853",
      "tertiary": "#999999"
    },
    "font": {
      "base": "#000000",
      "primary": "#ea4335",
      "secondary": "#34a853",
      "tertiary": "#cccccc"
    }
  },
  "font": {
    "family": {
      "headers": "Montserrat, sans-serif",
      "base": "Tahoma, Arial, 'Helvetica Neue', sans"
    },
    "platform": {
      "system": "Tahoma, Arial, 'Helvetica Neue', sans"
    }
  },
  "size": {
    "font": {
      "xsmall": "8pt",
      "small": "10pt",
      "medium": "12pt",
      "large": "14pt",
      "xlarge": "18pt",
      "2xlarge": "24pt",
      "3xlarge": "32pt",
      "4xlarge": "40pt",
      "5xlarge": "48pt",
      "6xlarge": "56pt",
      "7xlarge": "64pt",
      "8xlarge": "72pt",
      "9xlarge": "80pt",
      "10xlarge": "88pt",
      "base": "12pt"
    }
  },
  "icon": {
    "content_copy": "url('/tokens/ts/assets/icons/content_copy.svg')",
    "content_paste": "url('/tokens/ts/assets/icons/content_paste.svg')",
    "logo": "url('/tokens/default-brand/assets/icons/logo.svg')"
  }
} as const;
        