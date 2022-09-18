export const theme = {
  config: {
    initialColorModeName: 'light',
    useColorSchemeMediaQuery: false,
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#609",
    secondary: "#306",
    muted: "#f6f6f6",
    lightGray: "#ccc",
    tertiary: "#0B7A75",
    highlight: "rgba(0, 0, 0, 0.125)",
    modes: {
      dark: {
        text: '#f4f4f4',
        background: '#232323',
        muted: "#363636",
        lightGray: "#333",
        primary: '#9BF3F0',
        secondary: "#306",
        tertiary: "#FFC857",
        highlight: "rgba(95, 95, 95, 0.5)",
      }
    }
  },
  sizes: {
    container: 1140,
  },
  space: [
    0,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512
  ],
  fonts: {
    "body": "Poppins, sans-serif",
    "heading": "Poppins, sans-serif",
    "monospace": "Menlo, monospace"
  },
  fontSizes: [
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
    96
  ],
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      cursor: "pointer",
      '&:hover': {
        bg: 'text',
      }
    },
    secondary: {
      color: 'text',
      bg: 'muted',
      cursor: "pointer",
      '&:hover': {
        bg: 'secondary',
        color: 'background',
      },
      borderRadius: 0,
    },
    tertiary: {
      color: 'background',
      bg: 'tertiary',
      cursor: "pointer",
      '&:hover': {
        bg: 'text',
      }
    }
  },
  cards: {
    primary: {
      bg: 'background',
      padding: 4,
      borderRadius: 4,
      boxShadow: t => `0 0 5px ${t.colors.highlight}`,
    },
  },
  links: {
    nav: {
      px: 2,
      py: 1,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    plain: {
      color: 'text',
      textDecoration: 'none',
      '&:hover': {
        color: 'primary',
      }
    }
  },
  forms: {
    label: {
      fontSize: 1,
    },
    input: {
      mb: 4,
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
  },
  "fontWeights": {
    "body": 200,
    "heading": 500,
    "bold": 500
  },
  "lineHeights": {
    "body": 1.625,
    "heading": 1.25
  },
  "styles": {
    "root": {
      "fontFamily": "body",
      "lineHeight": "body",
      "fontWeight": "body"
    },
    "h1": {
      "color": "text",
      "fontFamily": "heading",
      "lineHeight": "heading",
      "fontWeight": "heading",
      "fontSize": 5
    },
    "h2": {
      "color": "text",
      "fontFamily": "heading",
      "lineHeight": "heading",
      "fontWeight": "heading",
      "fontSize": 4
    },
    "h3": {
      "color": "text",
      "fontFamily": "heading",
      "lineHeight": "heading",
      "fontWeight": "heading",
      "fontSize": 3
    },
    "h4": {
      "color": "text",
      "fontFamily": "heading",
      "lineHeight": "heading",
      "fontWeight": "heading",
      "fontSize": 2
    },
    "h5": {
      "color": "text",
      "fontFamily": "heading",
      "lineHeight": "heading",
      "fontWeight": "heading",
      "fontSize": 1
    },
    "h6": {
      "color": "text",
      "fontFamily": "heading",
      "lineHeight": "heading",
      "fontWeight": "heading",
      "fontSize": 0
    },
    "p": {
      "color": "text",
      "fontFamily": "body",
      "fontWeight": "body",
      "lineHeight": "body"
    },
    "a": {
      "color": "primary"
    },
    "pre": {
      "fontFamily": "monospace",
      "overflowX": "auto",
      "code": {
        "color": "inherit"
      }
    },
    "code": {
      "fontFamily": "monospace",
      "fontSize": "inherit"
    },
    "table": {
      "width": "100%",
      "borderCollapse": "separate",
      "borderSpacing": 0
    },
    "th": {
      "textAlign": "left",
      "borderBottomStyle": "solid"
    },
    "td": {
      "textAlign": "left",
      "borderBottomStyle": "solid"
    },
    "img": {
      "maxWidth": "100%"
    },
    hr: {
      borderColor: 'lightGray'
    }
  }
}
