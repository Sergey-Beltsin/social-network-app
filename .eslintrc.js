const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "plugin:effector/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "effector"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "no-use-before-define": ["error", { variables: false }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/require-default-props": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.resolve(__dirname, "src")]],
        extensions: [".ts", ".js", ".jsx", ".json", ".tsx"],
      },
    },
  },
};
