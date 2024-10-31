// jest.setup.js
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// BackHandler 모의 처리 추가
jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));
