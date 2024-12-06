import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation, NavigationProp, CommonActions, useFocusEffect } from '@react-navigation/native';
import { PetDetails } from '@types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoundedCircleButton, RoundedSquareButton, RoundedTextButton } from '@common/RoundedButton';
import { fetchUserProfile } from '@api/userApi';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import { handleLogout } from '@api/loginApi';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import { PetCard as NewPetCard } from '@components/MyPetCard';
import Avatar from '@common/Avatar';
import HeaderBar from '@components/HeaderBar';
import { Divider } from 'react-native-paper';

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
    <View className='ml-4 my-auto h-24 flex justify-center'>
      <TouchableOpacity
        onPress={handleAddPetPress}
      >
        <Image source={require('@image/frame/addPet.png')} width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

const DeviceCardLayout: React.FC<any> = ({children, onPress}) => (
  <View className="mx-2">
    <RoundedSquareButton 
      size="sm" 
      rounded="2xl" 
      outline="inactive-solid" 
      backgroundColor="bg-white"
      onPress={onPress}
    >
      {children}
    </RoundedSquareButton>
  </View>
);

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => (
  <DeviceCardLayout
    onPress={() => console.log(device.id)}>
    <MCIcon name="devices" color="black" size={30} />
    <StylizedText type="label" styleClass="text-black">
      {device.name}
    </StylizedText>
  </DeviceCardLayout>
);

const AddDeviceButton: React.FC = () => (
  <DeviceCardLayout
  onPress={() => console.log("기기 추가")}>
  <MCIcon name="devices" color="black" size={30} />
  <StylizedText type="label" styleClass="text-black">
    {"기기 추가"}
  </StylizedText>
</DeviceCardLayout>
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
  const handleHelpPress = async () => {
    console.log('미구현 : 고객센터 관련 문의')
  };

  return (
    <ScrollView className="flex-1 bg-white" stickyHeaderIndices={[0, 2]}>
      <HeaderBar
        showBackButton={false}
        iconButtons={[
          { icon : <FeatherIcon size={22} name='help-circle' color='#00000' opacity={0.3} />, onPress: handleHelpPress},
          { icon: <MTIcon size={22} name='logout' />, onPress: handleLogoutPress },
        ]}
        />
      <View className="flex items-center mb-1">
        <Avatar source={{ uri: 'https://via.placeholder.com/80' }} size={115} />
        <HeaderText
          highlight={username}
          text={`안녕하세요 ${username}!`}
        />
        <View className='mb-3'>
          <RoundedTextButton 
          content="내 정보 관리하기" 
          color="bg-secondary" 
          widthOption="md" 
          onPress={() => navigation.navigate('EditProfile')} 
          />
        </View>
      </View>
      <Divider className='h-1 bg-gray-100'/>
      <View className="p-4">
        <View className="mb-3">
          <HeaderText 
              highlight={username}
              text={`${username}의 반려동물`}
              type='header2'
            />
          <FlatList
            data={petIds}
            renderItem={renderPetItem}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={AddPetButton}
          />
        </View>
        <View className="mb-3">
          <HeaderText 
            highlight={username}
            text={`${username}의 기기`}
            type='header2'
          />
          <FlatList
            data={deviceData}
            renderItem={renderDeviceItem}
            keyExtractor={item => item.id}
            horizontal={true}
            ListFooterComponent={AddDeviceButton}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View className="flex-1 mt-1 py-6 bg-gray-100">
        <View className='flex-row items-top justify-center'>
          <MCIcon name='copyright'/>
          <StylizedText type='body2' styleClass='ml-1 text-gray-600'>
            JM smart, INC.
          </StylizedText>
        </View>
      </View>
    </ScrollView>
  );
};


export default MyPage;
