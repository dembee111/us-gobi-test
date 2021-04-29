module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 0,
    'react/display-name': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: '17.0.2',
    },
  },
};
