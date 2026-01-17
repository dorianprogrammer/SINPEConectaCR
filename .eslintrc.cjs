module.exports = {
  root: true,
  env: { es2023: true, node: true, browser: true },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["dist", "build", "node_modules"],
};