const path = require('path')

module.exports = {
  ignore: [
    '**/App.js',
    '**/*.test.js',
    '**/styles/GlobalStyle.js',
    'src/Components/Icons.js',
  ],
  defaultExample: false,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: ['src/Components/**/[A-Z]*.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styles/StyleguideWrapper'),
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap',
        },
      ],
    },
  },
}
