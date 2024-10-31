// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation))",
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@react-native-community/geolocation$': '<rootDir>/__mocks__/@react-native-community/geolocation.js',
  },
};
