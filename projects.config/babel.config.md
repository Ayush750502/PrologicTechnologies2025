1. For automatice removal of console.log from the production code:

```cmd
npm install --save-dev babel-plugin-transform-remove-console
```

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
```
