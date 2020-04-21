const theme = {
  colors: {
    white: {
      primary: '#FFFFFF',
    },
    black: {
      primary: '#040201',
    },
    orange: {
      light: '#FDF9F7',
      primary: '#E9BFA4',
      dark: '#231309',
    },
    red: {
      bright: '#C42F41',
      primary: '#af2a3a',
    },
  },
  fonts: {
    family: {
      serif: `'Noto Serif', serif`,
      sanSerif: `'Raleway', sans-serif`,
    },
    height: {

    },
    size: {
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      24: '24px',
      28: '28px',
      36: '36px',
      48: '48px',
    },
    weight: {
      serif: {
        regular: '400',
        bold: '700',
      },
      sanSerif: {
        regular: '400',
        bold: '700',
        black: '900',
      },
    },
  },
  max: {
    site: '1280px',
    '1x': '400px',
    '2x': '520px',
    '3x': '700px',
  },
  media: {
    mobileLarge: '(min-width: 414px)',
    tablet: '(min-width: 768px)',
    ipad: '(min-width: 1024px) and (min-height: 1200px)',
    desktop: '(min-width: 1024px)',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '20px',
    7: '24px',
    8: '32px',
    9: '48px',
    10: '56px',
    11: '72px',
    12: '96px',
    navHeight: '50px',
  },
  zIndexes: {
    nav: 10,
    navTakeover: 20,
  },
};

export default theme;
