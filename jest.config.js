export default {
  testEnvironment: 'node',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  // No need for extensionsToTreatAsEsm since it's already inferred from package.json
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js': '$1',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!.*\\.mjs$)"
  ],
};