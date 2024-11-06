import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation, NavigationProp, CommonActions, useFocusEffect } from '@react-navigation/native';
import { PetDetails } from '@types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchUserProfile } from '@api/userApi';
import { fetchUserPets, getPetDetails } from '@api/petApi';
import { handleLogout } from '@api/loginApi';
import { PetCard as NewPetCard } from '@src/components/FlatListCards';

interface PetCardProps {
  petId: string;
  devices: Device[];
}

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
    <TouchableOpacity style={styles.addPetButton} onPress={handleAddPetPress}>
      <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.addPetIcon} />
      <Text style={styles.addPetText}>반려동물 추가</Text>
    </TouchableOpacity>
  );
};

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => (
  <View style={styles.deviceCard}>
    <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.deviceImage} />
    <Text style={styles.deviceName}>{device.name}</Text>
  </View>
);

const AddDeviceButton: React.FC = () => (
  <TouchableOpacity style={styles.addPetButton}>
    <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.addPetIcon} />
    <Text style={styles.addPetText}>기기 추가</Text>
  </TouchableOpacity>
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
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <Text style={styles.greeting}>
          안녕하세요 <Text style={{ color: 'skyblue' }}>{username}!</Text>
        </Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editProfileText}>내 정보 관리하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            <Text style={{ color: 'skyblue' }}>{username}</Text>의 반려동물
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>전체보기</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={petIds}
          renderItem={renderPetItem}
          keyExtractor={item => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={AddPetButton}
          contentContainerStyle={styles.petList}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            <Text style={{ color: 'skyblue' }}>{username}</Text>의 기기
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>전체보기</Text>
          </TouchableOpacity>
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

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.customerServiceButton}>
          <Text style={styles.customerServiceText}>고객센터</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  profileImage: {
    marginTop: 85,
    width: 130,
    height: 130,
    borderRadius: 80,
  },
  greeting: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editProfileButton: {
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
  },
  editProfileText: {
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#007AFF',
  },
  petList: {
    paddingHorizontal: 15,
  },
  petCardContainer: {
    marginRight: 15,
    marginBottom: 10,
    width: 300,
  },
  petCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  petInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  petDetails: {
    color: '#666',
    fontSize: 14,
  },
  deviceStatus: {
    alignItems: 'center',
  },
  watchIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  deviceStatusText: {
    fontSize: 12,
    color: '#007AFF',
  },
  addPetButton: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    borderStyle: 'dashed',
    marginTop: 10,
  },
  addPetIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  addPetText: {
    color: '#666',
    fontSize: 14,
  },
  deviceCard: {
    marginRight: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: 100,
  },
  deviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  deviceName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  customerServiceButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  customerServiceText: {
    color: '#007AFF',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,

    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutButton: {
    // 필요에 따라 스타일 추가
  },
  logoutText: {
    color: '#007AFF',
  },

});

export default MyPage;
