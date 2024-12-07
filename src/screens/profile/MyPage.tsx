import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation, NavigationProp, CommonActions, useFocusEffect } from '@react-navigation/native';
import { PetDetails } from '@types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoundedSquareButton, RoundedTextButton } from '@common/RoundedButton';
import { fetchUserProfile } from '@api/userApi';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import { handleLogout } from '@api/loginApi';
import { Divider } from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import { PetCard as NewPetCard } from '@components/MyPetCard';
import Avatar from '@common/Avatar';
import HeaderBar from '@components/HeaderBar';

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

  useFocusEffect(
    useCallback(() => {
      const fetchDetails = async () => {
        const details = await getPetDetails(petId);
        setPetDetails(details || null);
      };
      fetchDetails();
    }, [petId])
  );

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
        onSelectDevice={(deviceId: string) => setSelectedDeviceId(deviceId)}
        onPress={() => navigation.navigate('PetProfile', { id : petId })}
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
  <DeviceCardLayout onPress={() => console.log(device.id)}>
    <MCIcon name="devices" color="black" size={30} />
    <StylizedText type="label" styleClass="text-black">
      {device.name}
    </StylizedText>
  </DeviceCardLayout>
);

const AddDeviceButton: React.FC = () => (
  <DeviceCardLayout onPress={() => console.log('기기 추가')}>
    <MCIcon name="devices" color="black" size={30} />
    <StylizedText type="label" styleClass="text-black">
      {'기기 추가'}
    </StylizedText>
  </DeviceCardLayout>
);

const MyPage: React.FC = () => {
  const navigation = useNavigation<MyPageNavigationProp>();

  const [username, setUsername] = useState('');
  const [petIds, setPetIds] = useState<string[]>([]);

  const fetchData = async () => {
    const userData = await fetchUserProfile();
    if (userData) {
      setUsername(userData.name);
    }
    const fetchedPetIds = await fetchUserPets();
    setPetIds(fetchedPetIds);
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
    <ScrollView className="flex-1 bg-white" stickyHeaderIndices={[0, 2]}>
      <HeaderBar
        showBackButton={false}
        iconButtons={[
          {
            icon: <FeatherIcon size={22} name="help-circle" color="#000000" opacity={0.3} />,
            onPress: () => console.log('도움말'),
          },
          {
            icon: <MTIcon size={22} name="logout" />,
            onPress: handleLogoutPress,
          },
        ]}
      />
      <View className="flex items-center mb-4">
        <Avatar source={{ uri: 'https://via.placeholder.com/80' }} size={115} />
        <HeaderText highlight={username} text={`안녕하세요 ${username}!`} />
        <RoundedTextButton
          content="내 정보 관리하기"
          color="bg-secondary"
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
      <Divider className="h-1 bg-gray-100" />
      <View className="p-4">
        <HeaderText highlight={username} text={`${username}의 반려동물`} type="header2" />
        <FlatList
          data={petIds}
          renderItem={renderPetItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={AddPetButton}
        />
        <View className='h-2'/>
        <HeaderText highlight={username} text={`${username}의 기기`} type="header2" />
        <FlatList
          data={deviceData}
          renderItem={renderDeviceItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={AddDeviceButton}
        />
      </View>
      <View className="flex-1 mt-1 py-6 bg-gray-100">
        <View className="flex-row items-center justify-center">
          <MCIcon name="copyright" />
          <StylizedText type="body2" styleClass="ml-1 text-gray-600">
            JM smart, INC.
          </StylizedText>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPage;
