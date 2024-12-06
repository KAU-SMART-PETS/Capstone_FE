import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import { RoundedTextButton } from '@components/common/RoundedButton';

const ResultPetDetails = ({ route }) => {
  const navigation = useNavigation();
  const { petName } = route.params;
  const [ownerInfo, setOwnerInfo] = useState(null);

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
      }
    };

    fetchOwnerInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderText
          highlight={petName}
          text={`${petName} 주인 정보입니다.`}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <StylizedText type="label" styleClass="text-secondary">
            이름:
          </StylizedText>
          <StylizedText type="body2" styleClass="text-black">
            {ownerInfo?.name || '정보 없음'}
          </StylizedText>
        </View>
        <View style={styles.detailRow}>
          <StylizedText type="label" styleClass="text-secondary">
            이메일:
          </StylizedText>
          <StylizedText type="body2" styleClass="text-black">
            {ownerInfo?.email || '정보 없음'}
          </StylizedText>
        </View>
        <View style={styles.detailRow}>
          <StylizedText type="label" styleClass="text-secondary">
            전화번호:
          </StylizedText>
          <StylizedText type="body2" styleClass="text-black">
            {ownerInfo?.phoneNumber || '정보 없음'}
          </StylizedText>
        </View>
      </View>

      {/* 하단 버튼 */}
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 20,
    paddingVertical: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 7,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  bottomButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default ResultPetDetails;