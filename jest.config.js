const config = {
  testEnvironment: "node",
  transform: {},
  testRunner: "jest-circus/runner",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  // Add the line below to enable ESM support
  testEnvironmentOptions: {
    loader: "esm",
  },
};

export default config;
