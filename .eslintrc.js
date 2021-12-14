module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    // "eslint:recommended",
    // "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    semi: ['error', 'never'],
    'no-param-reassign': 0,
    'react/jsx-filename-extension': [2, { extensions: ['js', 'jsx'] }],
    'import/no-extraneous-denpendencies': 0,
    'import/prefer-default-export': 0,
  },
}
