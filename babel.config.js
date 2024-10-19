module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],  // src 디렉토리를 루트로 설정
          alias: {
            '@api': './src/api',
            '@data': './src/api/data',
            '@components': './src/components',
            '@screens': './src/screens',
            '@constants': './src/utils/constants',
            '@types': './src/utils/contsants/types',
            '@image': './src/assets/image',
            // 필요한 alias를 더 추가할 수 있습니다.
          },
        },
      ],
      'react-native-reanimated/plugin',
      'nativewind/babel',
    ],
  };
};
