module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "globals":{
    "document": true,
    "localStorage": true,
    "window": true,
    "require": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-console": 1,
    "no-var": 0,
    "semi": 0,
    "no-irregular-whitespace": 1,
    "no-trailing-spaces": 2,
    "eol-last": 1,
    "no-func-assign": 2,
    "no-redeclare": 2,
    "no-spaced-func": 2,
    "no-undef": 2,
    "no-use-before-define": 2,
    "no-mixed-spaces-and-tabs": 0,
    "quotes": [
      2,
      "single"
    ],
    // "react/jsx-indent": [2, 'tab'],
    // "react/jsx-closing-tag-location": 1,
    'react/jsx-closing-bracket-location': [1, 'after-props'],
    "react/jsx-indent-props": [2, 'first']
  }
};