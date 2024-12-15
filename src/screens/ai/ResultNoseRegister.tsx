import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import { RoundedTextButton } from '@components/common/RoundedButton';

const ResultNoseRegister = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { imageUri, petName = '' } = route.params || {};

  const handleBackButtonPress = () => {
    navigation.navigate('RegisterPetNose');
  };

  if (!imageUri || !petName) {
    console.error('Missing imageUri or petName in route params');
    return (
      <View style={styles.errorContainer}>
        <StylizedText type="header1" styleClass="text-black">
          데이터를 불러올 수 없습니다.
        </StylizedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 성공 메시지 */}
      <View style={styles.headerContainer}>
        <HeaderText
          highlight={petName}
          text={`비문 이미지 등록에 성공했습니다!`}
        />
      </View>

      {/* 비문 이미지 */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      {/* 확인 버튼 */}
      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton
          content="확인"
          widthOption="xl"
          onPress={handleBackButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 50,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
});

export default ResultNoseRegister;
