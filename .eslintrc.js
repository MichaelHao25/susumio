// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    // "indent": [
    //   "error",
    //   2
    // ],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always", { omitLastInOneLineBlock: true }],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
  },
};
