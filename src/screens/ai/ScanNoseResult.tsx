import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StylizedText from '@components/common/StylizedText';

const backIcon = require('../../assets/image/icon/arrow_back.png'); // 뒤로가기 아이콘

const ScanNoseResult = ({ route }) => {
  const navigation = useNavigation();
  const { imageUri, result } = route.params;

  return (
    <View style={styles.container}>
      {/* 헤더 컨테이너 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>

        <StylizedText type="header1" styleClass="text-black mb-4 mt-6" style={styles.headerText}>
          비문 조회 결과입니다.
        </StylizedText>
      </View>

      {/* 이미지 */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      {/* 결과 컨테이너 */}
      <View style={styles.resultContainer}>
        <StylizedText type="body1" styleClass="text-black mt-2">
          {result.closest_class
            ? `가장 가까운 클래스: ${result.closest_class}`
            : "결과를 불러올 수 없습니다."}
        </StylizedText>
        <StylizedText type="body1" styleClass="text-black mt-2">
          {result.min_distance !== undefined
            ? `유사도: ${result.min_distance}`
            : ""}
        </StylizedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerContainer: {
      paddingHorizontal: 30,
      paddingVertical: 60,
    },
  headerText: {
    marginTop: 10,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20, // 이미지와 결과 박스 사이 여백
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  resultContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 15, // 내부 텍스트와 박스 간격 조정
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
});

export default ScanNoseResult;