const path = require("path");

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.resolve(__dirname, "src")]],
        extensions: [".ts", ".js", ".jsx", ".json", ".tsx"],
      },
    },
  },
  rules: {
    "import/prefer-default-export": 0,
    "import/extensions": 0,
  },
};
