import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BannerSection } from '@common/BannerSection';
import WalkingdogIcon from '@image/icon/walkingDogIcon.png';
import { WalkDetailsCard } from '@components/FlatListCards';
import { RoundedTextButton } from '@common/RoundedButton';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { Provider as PaperProvider } from 'react-native-paper';
import { fetchRecentWalkRecords, fetchPetList } from '@api/walkApi';
import { LoadingDots } from '@common/Loading';

const WalkStartPage: React.FC = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pets, setPets] = useState<any[]>([]);
  const [recentWalks, setRecentWalks] = useState<any[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [loadingWalks, setLoadingWalks] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);


  useEffect(() => {
    const fetchWalkRecords = async () => {
      try {
        setLoadingWalks(true);
        const data = await fetchRecentWalkRecords();
        if (data && Array.isArray(data.recentWalk)) {
          setRecentWalks(data.recentWalk);
        } else {
          setRecentWalks([]);
        }
      } catch (error) {
        console.error('Error fetching walk records:', error);
        Alert.alert('오류', '산책 기록을 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoadingWalks(false);
      }
    };

    fetchWalkRecords();
  }, []);


  useEffect(() => {
    const fetchPets = async () => {
      if (isModalVisible) {
        try {
          setLoadingPets(true);
          const petData = await fetchPetList();
          if (petData && Array.isArray(petData.pets)) {
            setPets(petData.pets);
            console.log('Fetched pets:', petData.pets);
          } else {
            setPets([]);
            console.error('Invalid pet list response structure');
          }
        } catch (error) {
          console.error('Error fetching pets:', error);
          Alert.alert('오류', '반려동물 목록을 불러오는 중 문제가 발생했습니다.');
        } finally {
          setLoadingPets(false);
        }
      }
    };

    fetchPets();
  }, [isModalVisible]);


  const handleSubmit = () => {
    if (selectedPetId) {
      const selectedPet = pets.find((pet) => pet.id === selectedPetId);
      if (selectedPet) {
        setIsModalVisible(false);
        navigation.navigate('MapPage', { petId: selectedPetId }); 
      } else {
        Alert.alert('오류', '반려동물을 선택해주세요.');
      }
    } else {
      Alert.alert('오류', '반려동물을 선택해주세요.');
    }
  };

  return (
    <PaperProvider>
      <ScrollView className="flex-1 bg-white">
     
        <View className="mb-2 mt-10">
          <BannerSection
            row1="오늘도 즐겁게"
            row2="산책을 시작해볼까요?"
            sideImg={WalkingdogIcon}
            onPress={() => console.log("오늘도 즐겁게 배너 클릭됨")}
          />
          <View className="px-4 mb-2 mt-2 ml-4">
            <Text className="text-lg font-bold text-gray-800">최근 산책</Text>
          </View>

     
          {loadingWalks ? (
            <LoadingDots />
          ) : recentWalks.length > 0 ? (
            recentWalks.map((walk, index) => (
              <WalkDetailsCard
                key={index}
                title={walk.petName}
                details={[
                  { label: '산책일시', value: walk.walkDate },
                  { label: '산책 시간', value: `${Math.floor(walk.walkTime / 60)}분` },
                  { label: '이동 거리', value: `${(walk.distance / 1000).toFixed(2)} km` },
                ]}
              />
            ))
          ) : (
            <Text className="text-gray-500 text-center mt-4">최근 산책 기록이 없습니다.</Text>
          )}
        </View>

   
        <View className="p-4 items-center">
          <RoundedTextButton
            color="bg-primary"
            textColor="text-white"
            content="산책 시작하기"
            borderRadius="rounded-3xl"
            widthOption="xl"
            shadow={true}
            onPress={() => setIsModalVisible(true)}
          />
        </View>

  
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black bg-opacity-50">
            <View className="bg-white rounded-t-lg p-6">
              <Text className="text-lg font-bold mb-4">산책할 반려동물을 선택해주세요.</Text>
              {loadingPets ? (
                <LoadingDots />
              ) : (
                pets.map((pet) => (
                  <TouchableOpacity
                    key={pet.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: selectedPetId === pet.id ? '#ADD8E6' : '#F0F0F0',
                      marginBottom: 8,
                    }}
                    onPress={() => setSelectedPetId(pet.id)}
                  >
                    <Avatar size={60} imageUri={pet.imageUrl || undefined} />
                    <StylizedText type="body1" style={{ marginLeft: 16 }}>
                      {pet.name}
                    </StylizedText>
                  </TouchableOpacity>
                ))
              )}
              <View className="items-center">
                <RoundedTextButton
                  content="산책 시작하기"
                  widthOption="xl"
                  onPress={handleSubmit}
                  color="bg-primary"
                  textColor="text-white"
                />
                <RoundedTextButton
                  content="취소"
                  widthOption="xl"
                  onPress={() => setIsModalVisible(false)}
                  color="bg-gray-300"
                  textColor="text-black"
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </PaperProvider>
  );
};

export default WalkStartPage;
