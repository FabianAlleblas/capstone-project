const path = require('path')

module.exports = {
  ignore: ['**/App.js', '**/*.test.js', '**/styles/GlobalStyle.js'],
  defaultExample: false,
  exampleMode: 'expand',
  usageMode: 'expand',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/globalstyles/StyleWrapper'),
  },
}
