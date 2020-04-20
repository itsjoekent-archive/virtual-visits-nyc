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
      primary: '#e9bfa4',
      dark: '#231309',
    },
    red: {
      primary: '#C42F41',
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
      1: '12px',
      2: '14px',
      3: '18px',
      4: '24px',
      5: '28px',
      6: '36px',
      7: '48px',
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
  grid: {
    column: '12%',
    gutter: '24px',
  },
  max: {
    site: '1280px',
  },
  media: {
    mobileLarge: '(min-width: 425px)',
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
  },
  zIndexes: {
    nav: 10,
    navTakeover: 20,
  },
};

export default theme;
