export const base = {
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
    "white": "#ffffff",
    "black": "#000000",
    "gray": {
      "light": "#cccccc",
      "medium": "#999999",
      "dark": "#111111"
    },
    "success": "#22bb33",
    "warning": "#f0ad4e",
    "danger": "#bb2124",
    "info": "#5bc0de",
    "primary": "#ea4335",
    "secondary": "#34a853",
    "tertiary": "#999999",
    "on": {
      "primary": "#ffffff",
      "secondary": "#ffffff",
      "tertiary": "#ffffff",
      "success": "#ffffff",
      "warning": "#ffffff",
      "danger": "#ffffff",
      "info": "#ffffff"
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
    "content_copy": "url('/tokens/base/assets/icons/content_copy.svg')",
    "content_paste": "url('/tokens/base/assets/icons/content_paste.svg')",
    "check_circle": "url('/tokens/base/assets/icons/check_circle.svg')",
    "logo": "url('/tokens/base/assets/icons/logo.svg')"
  }
} as const;
        