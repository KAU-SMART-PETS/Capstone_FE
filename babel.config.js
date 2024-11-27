module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:@react-native/babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],  // src 디렉토리를 루트로 설정
          alias: {
            "@root": "./",   
            '@api': './src/api',
            '@data': './src/api/data',
            '@components': './src/components',
            '@common': './src/components/common',
            '@screens': './src/screens',
            '@example': './src/screens/example',
            '@constants': './src/utils/constants',
            '@types': './src/utils/constants/types',
            '@image': './src/assets/image',
            '@assets': './src/assets', 
            // 필요한 alias를 더 추가할 수 있음
          },
        },
      ],
      'react-native-reanimated/plugin',
      'nativewind/babel',
    ],
  };
};
