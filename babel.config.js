module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset', // 추가: Jest에서 사용하기 위해 metro preset 적용
      'module:@react-native/babel-preset'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@root": "./",   
            '@api': './src/api',
            '@data': './src/api/data',
            '@components': './src/components',
            '@common': './src/components/common',
            '@screens': './src/screens',
            '@constants': './src/utils/constants',
            '@types': './src/utils/contsants/types',
            '@image': './src/assets/image',
          },
        },
      ],
      'react-native-reanimated/plugin',
      'nativewind/babel',
    ],
  };
};
