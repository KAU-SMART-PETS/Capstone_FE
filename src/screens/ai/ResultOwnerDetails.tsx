import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@common/StylizedText';
import { RoundedTextButton } from '@common/RoundedButton';
import CustomTextInput from '@common/CustomTextInput';

const ResultOwnerDetails = ({ route }) => {
  const navigation = useNavigation();
  const { petName } = route.params;
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const jsessionid = await AsyncStorage.getItem('JSESSIONID');
        if (!jsessionid) {
          Alert.alert('오류', '로그인이 필요합니다.');
          return;
        }

        const response = await fetch(`${config.API_SERVER_URL}/api/v1/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${jsessionid}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOwnerInfo(data);
        } else {
          Alert.alert('오류', '사용자 정보를 가져올 수 없습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 요청 오류:', error);
        Alert.alert('오류', '사용자 정보를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <StylizedText type="body2" styleClass="text-gray">
          데이터를 불러오는 중입니다...
        </StylizedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <HeaderText
          highlight={petName}
          text={`${petName}의 주인 정보입니다.`}
        />
      </View>

      {/* 사용자 정보 */}
      <View style={styles.infoContainer}>
        <CustomTextInput
          label="이름"
          value={ownerInfo?.name || '정보 없음'}
          isEditableInitially={false}
          type="readOnly"
          style={styles.inputStyle}
        />
        <CustomTextInput
          label="이메일"
          value={ownerInfo?.email || '정보 없음'}
          isEditableInitially={false}
          type="readOnly"
          style={styles.inputStyle}
        />
        <CustomTextInput
          label="전화번호"
          value={ownerInfo?.phoneNumber || '정보 없음'}
          isEditableInitially={false}
          type="readOnly"
          style={styles.inputStyle}
        />
      </View>

      {/* 이미지 */}
      <Image
        source={require('@assets/image/icon/people_dog.png')}
        style={styles.image}
      />

      {/* 확인 버튼 */}
      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton
          content="확인"
          widthOption="xl"
          onPress={() => navigation.navigate('ScanNose')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginRight: 80,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  inputStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginBottom: 20,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bottomButtonContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 16,
  },
});

export default ResultOwnerDetails;