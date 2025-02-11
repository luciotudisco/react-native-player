// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/components/ui/*', 'dist/*'],
  rules: {
    'prettier/prettier': 'error',
  },
};
