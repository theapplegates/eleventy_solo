module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      './src/**/*.js',
      './src/**/*.11ty.js',
    ],
  },
  theme: {
    screens: {
      'sm': '640px',  // => @media (min-width: 640px) { ... }
      'md': '768px',  // => @media (min-width: 768px) { ... }
      'lg': '1024px', // => @media (min-width: 1024px) { ... }
      'xl': '1280px', // => @media (min-width: 1280px) { ... }
      'xb': '1920px', // => @media (min-width: 1920px) { ... }
    },
    fontFamily: {
      body: ['Public Sans', 'sans-serif'],
    },
    extend: {
      screens: {
        'dark': {
          'raw': '(prefers-color-scheme: dark)',
        },
      },
      fontSize: { // these will cease to be relevant with TWCSS 2.0, which will add 7xl, 8xl, **and** 9xl
        '7xl': '4.5rem',
        '8xl': '5rem',
      },
      colors: {
        blue: {
          '100': '#bbeeff',
          '200': '#00aaff',
          '300': '#0088ff',
          '400': '#0033ff',
          '500': '#0000ff',
          '600': '#0000bb',
          '700': '#0000aa',
          '800': '#000088',
          '900': '#000066',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
