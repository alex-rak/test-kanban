module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "@vue/standard",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    quotes: [
      "error",
      "double",
    ],
    semi: [
      "error",
      "always",
    ],
    "comma-style": [
      2,
      "last",
    ],
    "space-before-function-paren": ["error", {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    }],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "never",
      exports: "never",
      functions: "ignore",
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      ignoreWhenNoAttributes: true,
      ignores: ["pre", "textarea"],
    }],
    "vue/no-unused-components": 0,
    "vue/html-closing-bracket-newline": [
      "error", { multiline: "never" },
    ],
    "vue/component-name-in-template-casing": 0,
    "no-new": 0,
  },
};
