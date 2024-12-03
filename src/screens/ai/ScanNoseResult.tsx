import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, useEffect } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';

const backIcon = require('../../assets/image/icon/arrow_back.png');

const ScanNoseResult = ({ route }) => {
  const navigation = useNavigation();
  const { imageUri, result, petName } = route.params;

  return (
    <View style={styles.container}>
      {/* 결과 메시지 */}
      <View style={styles.headerContainer}>
        <HeaderText
          highlight={petName}
          text={`비문 조회 결과입니다.\n조회된 반려동물이 ${petName} 맞나요?`}
        />
      </View>

      {/* 안내 메시지 */}
      <View style={styles.infoContainer}>
        <StylizedText
          type="body1"
          styleClass="text-gray"
          style={styles.infoMessage}
        >
          이미지를 분석 결과{"\n"}가장 유사한 반려동물을 조회했습니다.{"\n"}
          정확하지 않다면 이미지를 다시 업로드해주세요.
        </StylizedText>
      </View>

      {/* 비문 이미지 */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 10, // 안내 메시지와 이미지 사이 간격
    alignItems: 'flex-start', // 왼쪽 정렬
    width: '100%',
    paddingLeft: 20, // 왼쪽 여백 추가
  },
  infoContainer: {
      marginBottom: 70, // 안내 메시지와 이미지 사이 간격
      alignItems: 'flex-start', // 왼쪽 정렬
      width: '100%',
      paddingLeft: 30, // 왼쪽 여백 추가
    },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  infoMessage: {
    textAlign: 'left',
  },
  image: {
    width: 270,
    height: 270,
    borderRadius: 30,
    borderColor: '#DDDDDD',
    backgroundColor: '#F2F2F2',
  },
});

export default ScanNoseResult;