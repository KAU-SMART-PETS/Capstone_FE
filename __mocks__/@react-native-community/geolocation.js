// __mocks__/@react-native-community/geolocation.js
export default {
    getCurrentPosition: jest.fn((success) =>
      success({
        coords: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
      })
    ),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
    stopObserving: jest.fn(),
  };
  