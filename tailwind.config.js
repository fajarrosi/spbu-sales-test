/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /(bg|text)-+/,
    },
  ],
  theme: {
    extend: {
      boxShadow: {
        cardone: '0px 2px 6px 0px rgba(13, 10, 44, 0.05)',
      },
      colors: {
        'primary-red': {
          100: '#7C1C1D',
          90: '#AD3131',
          80: '#ED4C4D',
          70: '#F17071',
          60: '#F49494',
          50: '#F8B7B8',
          30: '#FBDBDB',
          20: '#FDEDED',
          10: '#FFF5F5',
        },
        neutral: {
          90: '#353535',
          80: '#535353',
          70: '#707070',
          60: '#8E8E8E',
          50: '#667085',
          40: '#ABABAB',
          30: '#BABABA',
          20: '#C9C9C9',
          18: '#D0D5DD',
          15: '#D9D9D9',
          12: '#FAFAFA',
          10: '#EAEAEA',
        },
        'primary-blue': {
          100: '#091629',
          90: '#0E203D',
          80: '#173666',
          60: '#6B80A1',
          50: '#94A5BF',
          30: '#BECADC',
          20: '#D3DCEB',
          10: '#E8EFFA',
        },
        'semantic-blue': {
          80: '#2D70F2',
          20: '#EAF1FE',
          10: '#F2F6FE',
        },
        'semantic-green': {
          80: '#27AE60',
          20: '#E8F7EE',
        },
        'semantic-yellow': {
          90: '#C6A43D',
          80: '#F2C94C',
          20: '#FFF9E6',
        },
        'semantic-red': {
          80: '#E84040',
          20: '#FFE8E8',
          10: '#FEF1F1',
        },
        'semantic-brown': {
          80: '#926842',
          10: '#F1EBE6',
        },
        'semantic-orange': {
          90: '#FD8C3A',
          20: '#FFE7D7',
        },
        'inactive-page': '#667085',
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
};
