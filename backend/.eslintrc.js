module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'rules': {
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'valid-jsdoc': 'off',
    'max-len': 'off',
    'new-cap': 'off',
    'indent': ['error', 2],
  },
}
