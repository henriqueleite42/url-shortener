module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "module-resolver",
      {
        alias: {
          "@Entities": "./src/Entities",
          "@Controllers": "./src/Controllers",
          "@Utils": "./src/Utils",
          "@Routes": "./src/Routes",
          "@Config": "./src/Config",
          "@Assets": "./src/Assets",
          "@Types": "./src/Types",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
