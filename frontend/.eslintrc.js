module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    'max-len': 'off',
    'new-cap': 'off',
    'quotes': ['error', 'single']
  },
};