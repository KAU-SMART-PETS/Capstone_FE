import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import StylizedText from '@components/common/StylizedText';
import { RoundedTextButton } from '@components/common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import { launchImageLibrary } from 'react-native-image-picker';

const AlertNose = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const backIcon = require('../../assets/image/icon/arrow_back.png');
  const { petId, petType, petName } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);

  // 갤러리에서 이미지 선택
  const handleGallerySelect = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets[0]) {
        const selectedImageUri = response.assets[0].uri;
        navigation.navigate('ReadyToRegisterNose', {
          imageUri: selectedImageUri,
          petId,
          petType,
          petName,
        });
      }
      setModalVisible(false); // 모달 닫기
    });
  };

  // 촬영하기 버튼 동작
  const handleTakePhoto = () => {
    navigation.navigate('NoseCamera', {
      petId,
      petType,
      petName,
    });
    setModalVisible(false); // 모달 닫기
  };

  // 준비 완료 버튼 클릭
  const handleReadyButtonPress = () => {
    setModalVisible(true); // 모달창 띄우기
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={backIcon} style={styles.backIcon} />
         </TouchableOpacity>
      <View style={styles.headerContainer}>
        <StylizedText type="header1" styleClass="text-black mb-4">
          코의 전체 모양이{"\n"}잘 보이는 사진을 준비해주세요.
        </StylizedText>
        <StylizedText type="body2" styleClass="text-gray mb-6">
          준비된 사진이 적합하지 않으면 비문 조회에 어려움을 겪을 수 있습니다.
        </StylizedText>
      </View>

      <View style={styles.imageContainer}>
        {/* 적합한 사진 */}
        <View style={styles.imageRow}>
          <View style={styles.imageWrapper}>
            <Image source={require('@image/nose_example1.png')} style={styles.image} />
            <Image source={require('@image/icon/check.png')} style={styles.icon} />
          </View>
          <View style={styles.imageWrapper}>
            <Image source={require('@image/nose_example2.png')} style={styles.image} />
            <Image source={require('@image/icon/check.png')} style={styles.icon} />
          </View>
          <View style={styles.imageWrapper}>
            <Image source={require('@image/nose_example3.png')} style={styles.image} />
            <Image source={require('@image/icon/check.png')} style={styles.icon} />
          </View>
        </View>

        {/* 부적합한 사진 */}
        <View style={styles.incorrectRow}>
          <View style={styles.incorrectWrapper}>
            <Image source={require('@image/nose_example5.png')} style={styles.image} />
            <View style={styles.textWrapper}>
              <Image source={require('@image/icon/x.png')} style={styles.icon} />
              <StylizedText type="body2" styleClass="text-gray">
                코의 모양이{"\n"}너무 작아요.
              </StylizedText>
            </View>
          </View>
          <View style={styles.incorrectWrapper}>
            <Image source={require('@image/nose_example4.png')} style={styles.image} />
            <View style={styles.textWrapper}>
              <Image source={require('@image/icon/x.png')} style={styles.icon} />
              <StylizedText type="body2" styleClass="text-gray">
                코의 전체가{"\n"}보이지 않아요.
              </StylizedText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <RoundedTextButton
          content="준비 완료"
          widthOption="full"
          onPress={handleReadyButtonPress} // ModalLayout 열기
        />
      </View>

      {/* ModalLayout */}
      <ModalLayout
        visible={isModalVisible}
        setVisible={setModalVisible}
        rows={[
          {
            content: [
              <RoundedTextButton
                content="갤러리에서 가져오기"
                widthOption="lg"
                color="bg-primary"
                onPress={handleGallerySelect}
                key="gallery"
              />,
              <RoundedTextButton
                content="촬영하기"
                widthOption="lg"
                color="bg-primary"
                onPress={handleTakePhoto}
                key="camera"
              />,
            ],
            layout: 'col',
          },
        ]}
      />
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
    width: 30,
    height: 30,
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 80,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  incorrectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  incorrectWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
});

export default AlertNose;