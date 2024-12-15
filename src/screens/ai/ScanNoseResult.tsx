import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import CustomAlert from '@components/common/CustomAlert';
import { RoundedTextButton } from '@components/common/RoundedButton';

const ScanNoseResult = ({ route }) => {
  const navigation = useNavigation();
  const { petDetails, isOwner } = route.params;

  console.log('petDetails:', petDetails); // petDetails 확인

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleViewDetails = () => {
    if (isOwner) {
      navigation.navigate('ResultOwnerDetails', {
        petName: petDetails.name, // 반려동물 이름 전달
        petDetails: petDetails,   // 반려동물 세부 정보 전달
      });
    } else {
      setAlertMessage('본인의 반려동물이 아니어서\n주인 정보를 확인할 수 없습니다.\n본 서비스는 유료로 제공됩니다.');
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderText
          highlight={petDetails.name}
          text={`비문 조회 결과입니다.\n조회된 반려동물이 ${petDetails.name} 맞나요?`}
        />
      </View>

      <View style={styles.imageContainer}>
        {petDetails.pet_image || petDetails.imageUrl ? (
          <Image
            source={{ uri: petDetails.pet_image || petDetails.imageUrl }}
            style={styles.image}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Image
              source={require('@image/icon/example_cat.png')}
              style={styles.placeholderImage}
            />
            <Image
              source={require('@image/icon/example_cat1.png')}
              style={styles.placeholderImage}
            />
          </View>
        )}
      </View>

      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton
          content="상세보기"
          widthOption="xl"
          onPress={handleViewDetails}
        />
      </View>

      <CustomAlert
        visible={isAlertVisible}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false); // 알림창 닫기
          navigation.navigate('ScanNose'); // ScanNose 화면으로 돌아가기
        }}
      />
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
    paddingVertical: 80,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  placeholderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    marginHorizontal: 8,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default ScanNoseResult;

