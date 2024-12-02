import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoundedTextButton } from '@components/common/RoundedButton';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { fetchPetList } from '@api/walkApi';

const RecordStartPage: React.FC = () => {
  const navigation = useNavigation();
  const [pets, setPets] = useState<any[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);

 
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoadingPets(true);
        const petData = await fetchPetList();
        if (petData && Array.isArray(petData.pets)) {
          setPets(petData.pets);
        } else {
          Alert.alert('오류', '반려동물 목록을 불러올 수 없습니다.');
        }
      } catch (error) {
        console.error('Error fetching pet list:', error);
        Alert.alert('오류', '데이터를 가져오는 중 문제가 발생했습니다.');
      } finally {
        setLoadingPets(false);
      }
    };

    fetchPets();
  }, []);

 
  const handlePetSelection = (petId: string, petName: string) => {
    navigation.navigate('WalkRecord', { petId, petName }); 
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>반려동물을 선택해주세요</Text>
      {loadingPets ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : pets.length > 0 ? (
        pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#F0F0F0',
              marginBottom: 8,
            }}
            onPress={() => handlePetSelection(pet.id, pet.name)} 
          >
            <Avatar size={60} imageUri={pet.imageUrl || undefined} />
            <StylizedText type="body1" style={{ marginLeft: 16 }}>
              {pet.name}
            </StylizedText>
          </TouchableOpacity>
        ))
      ) : (
        <Text>등록된 반려동물이 없습니다.</Text>
      )}

      <View className="items-center">
        <RoundedTextButton
          content="새로고침"
          widthOption="xl"
          onPress={() => {
            setLoadingPets(true);
            fetchPetList()
              .then((petData) => {
                if (petData && Array.isArray(petData.pets)) {
                  setPets(petData.pets);
                } else {
                  Alert.alert('오류', '반려동물 목록을 다시 불러올 수 없습니다.');
                }
              })
              .catch((error) => console.error('Error refreshing pet list:', error))
              .finally(() => setLoadingPets(false));
          }}
          color="bg-gray-300"
          textColor="text-black"
        />
      </View>
    </View>
  );
};

export default RecordStartPage;
