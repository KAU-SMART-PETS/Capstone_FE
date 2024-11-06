import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation, NavigationProp, CommonActions, useFocusEffect } from '@react-navigation/native';
import { PetDetails } from '@types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoundedSquareButton, RoundedSquareButtonWithAvatar, RoundedTextButton } from '@src/components/common/RoundedButton';
import { fetchUserProfile } from '@api/userApi';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import { handleLogout } from '@api/loginApi';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylizedText, { HeaderText } from '@src/components/common/StylizedText';
import { PetCard as NewPetCard } from '@src/components/FlatListCards';
import Avatar from '@src/components/common/Avatar';

type MyPageNavigationProp = NavigationProp<RootStackParamList, 'MyPage'>;

interface Device {
  id: string;
  name: string;
}

interface PetCardContainerProps {
  petId: string;
  devices: Device[];
}

const deviceData: Device[] = [
  { id: '1', name: 'WATCH (1)' },
  { id: '2', name: 'WATCH (2)' },
  { id: '3', name: 'WATCH (3)' },
];

const PetCardContainer: React.FC<PetCardContainerProps> = ({ petId, devices }) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [petDetails, setPetDetails] = useState<PetDetails | null>(null);
  const navigation = useNavigation<MyPageNavigationProp>();

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getPetDetails(petId);
      if (details) {
        setPetDetails(details);
      }
    };
    fetchDetails();
  }, [petId]);

  const tempShowPetDetails = async () => {
    try {
      const petData = await AsyncStorage.getItem(`PET_${petId}`);
      if (petData) {
        const pet: PetDetails = JSON.parse(petData);
        pet.id = petId;
        navigation.navigate('PetProfile', { pet });
      } else {
        Alert.alert('알림', '반려동물 정보가 없습니다.');
      }
    } catch (error) {
      console.error('Error retrieving pet data:', error);
      Alert.alert('오류', '반려동물 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const name = petDetails?.name || 'Loading...';
  const details = petDetails
    ? `${petDetails.petType} ${petDetails.gender}, ${petDetails.weight}kg, ${petDetails.age}세`
    : '';
  const avatarPath = petDetails?.imageUrl;

  return (
    <View className="flex-1">
      <NewPetCard
        name={name}
        details={details}
        avatarPath={avatarPath || null} 
        devices={devices}
        selectedDeviceId={selectedDeviceId}
        onSelectDevice={(deviceId: string) => {
          setSelectedDeviceId(deviceId);
        }}
        onPress={tempShowPetDetails}
      />
    </View>
  );
};

const AddPetButton: React.FC = () => {
  const navigation = useNavigation<MyPageNavigationProp>();

  const handleAddPetPress = () => {
    navigation.navigate('PetRegister');
  };

  return (
    <View className='pt-5 pl-5'>
      <RoundedSquareButtonWithAvatar
        size="xs"
        backgroundColor="bg-white"
        outline='dotted'
        onPress={handleAddPetPress}
        avatarSource={require('@src/assets/image/frame/addPet.png')}
        avatarSize={40}
      >
        <Text style={{ textAlign: 'center', color: 'black', marginTop: 8 }}>반려동물 추가</Text>
      </RoundedSquareButtonWithAvatar>
    </View>
  );
};

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => (
  <View className="pt-4 mx-2">
    <RoundedSquareButton 
      size="sm" 
      rounded="lg" 
      outline="dotted" 
      backgroundColor="bg-white"
      onPress={() => console.log(device.id)}
    >
      <MCIcon name="devices" color="black" size={30} />
      <StylizedText type="label" styleClass="text-black">
        {device.name}
      </StylizedText>
    </RoundedSquareButton>
  </View>
);

const AddDeviceButton: React.FC = () => (
  <View className="pt-4 mx-2">
    <RoundedSquareButton 
      size="sm" 
      rounded="lg" 
      outline="dotted" 
      backgroundColor="bg-white"
      onPress={() => console.log("기기 추가")}
    >
      <MCIcon name="devices" color="black" size={30} />
      <StylizedText type="label" styleClass="text-black">
        {"기기 추가"}
      </StylizedText>
    </RoundedSquareButton>
  </View>
);


const MyPage: React.FC = () => {
  const navigation = useNavigation<MyPageNavigationProp>();

  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [petIds, setPetIds] = useState<string[]>([]);

  const fetchData = async () => {
    const userData = await fetchUserProfile();
    if (userData) {
      setUsername(userData.name);
      setUserData(userData);
    }

    const petIds = await fetchUserPets();
    setPetIds(petIds);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); 
    }, [])
  );

  const renderPetItem = ({ item }: { item: string }) => (
    <PetCardContainer petId={item} devices={deviceData} />
  );

  const renderDeviceItem = ({ item }: { item: Device }) => <DeviceCard device={item} />;

  const handleLogoutPress = async () => {
    const success = await handleLogout();
    if (success) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center mb-2 bg-white">
        <View className='pt-10'>
          <Avatar source={{ uri: 'https://via.placeholder.com/80' }} size={130} />
        </View>
        <HeaderText
          highlight={username}
          text={`안녕하세요 ${username}!`}
        />
        <View className='mb-2'>
          <RoundedTextButton 
          content="내 정보 관리하기" 
          color="bg-secondary" 
          widthOption="md" 
          onPress={() => navigation.navigate('EditProfile')} 
          className='mb-2'
          />
        </View>
      </View>

      <View className="bg-white rounded-lg p-4 mb-2">
        <View className="flex-row justify-between items-center mb-2">
          <HeaderText 
            highlight={username}
            text={`${username}의 반려동물`}
            type='header2'
          />
        </View>

        <FlatList
          data={petIds}
          renderItem={renderPetItem}
          keyExtractor={item => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={AddPetButton}
          contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} 
        />
      </View>

      <View className="bg-white rounded-lg p-4 mb-2">
        <View className="flex-row justify-between items-center mb-2">
          <HeaderText 
            highlight={username}
            text={`${username}의 기기`}
            type='header2'
          />

        </View>
        <FlatList
          data={deviceData}
          renderItem={renderDeviceItem}
          keyExtractor={item => item.id}
          horizontal={true}
          ListFooterComponent={AddDeviceButton}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View className="flex-row justify-around items-center p-4 bg-white rounded-lg">
        <TouchableOpacity className="items-center p-4 bg-white rounded-lg">
          <StylizedText type='body1' className='text-black'>고객센터</StylizedText>
        </TouchableOpacity>
        <TouchableOpacity className="items-center p-4 bg-white rounded-lg" onPress={handleLogoutPress}>
          <StylizedText type='body1' className='text-black'>로그아웃</StylizedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


export default MyPage;
