const path = require('path')

module.exports = {
  ignore: ['**/App.js', '**/*.test.js', '**/styles/GlobalStyle.js'],
  defaultExample: false,
  exampleMode: 'expand',
  usageMode: 'expand',
  components: ['src/components/**/[A-Z]*.js', 'src/plantlistpage/**/[A-Z]*.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/globalstyles/StyleWrapper'),
  },
}
