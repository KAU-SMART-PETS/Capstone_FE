import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import StylizedText from '@components/common/StylizedText';

const ResultNoseRegister = () => {
  const route = useRoute();
  const { imageUri, petName = '' } = route.params || {};

  if (!imageUri || !petName) {
    console.error("Missing imageUri or petName in route params");
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
      <StylizedText type="header1" styleClass="text-black mb-6" style={styles.successMessage}>
        비문 등록에 성공했습니다!
      </StylizedText>

      {/* 비문 이미지 */}
      <Image source={{ uri: imageUri }} style={styles.image} />

      {/* 반려동물 이름 */}
      <StylizedText type="header2" styleClass="text-black mt-6" style={styles.petName}>
        <StylizedText type="header2" style={{ color: '#73A8BA' }}>
          {petName}
        </StylizedText>
        의 비문 이미지
      </StylizedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  successMessage: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // 원형 이미지
    marginVertical: 20,
  },
  petName: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default ResultNoseRegister;