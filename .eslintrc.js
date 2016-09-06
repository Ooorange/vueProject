module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb/base',
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
    'no-alert': 0,
    'no-param-reassign': [2, { 'props': false }],
  }
}
