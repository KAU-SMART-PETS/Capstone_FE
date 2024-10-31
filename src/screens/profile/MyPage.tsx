import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@types';
import getPetDetails from './FetchPetInfo';
import { PetDetails } from '@types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MyPageNavigationProp = NavigationProp<RootStackParamList, 'MyPage'>;

interface Device {
  id: string;
  name: string;
}


const deviceData: Device[] = [
  { id: '1', name: 'WATCH (1)' },
  { id: '2', name: 'WATCH (2)' },
  { id: '3', name: 'WATCH (3)' },
];

const DropdownModal: React.FC<{
  isVisible: boolean,
  onClose: () => void,
  devices: Device[],
  onSelect: (deviceId: string) => void
}> = ({ isVisible, onClose, devices, onSelect }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(device.id);
                onClose();
              }}
            >
              <Text style={{color: 'black'}}>{device.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const PetCard: React.FC<{ petId: string; devices: Device[] }> = ({ petId, devices }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectDevice = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setIsDropdownOpen(false);
  };

  const tempShowPetDetails = async () => {
    try {
      const petData = await AsyncStorage.getItem(`PET_${petId}`);

      if (petData) {
        const pet: PetDetails = JSON.parse(petData);
        pet.id = petId;

        navigation.navigate('PetProfile', pet);
      } else {
        Alert.alert('알림', '반려동물 정보가 없습니다.');
      }
    } catch (error) {
      console.error('Error retrieving pet data:', error);
      Alert.alert('오류', '반려동물 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const selectedDevice = devices.find(device => device.id === selectedDeviceId);

  return (
    <TouchableOpacity onPress={tempShowPetDetails}>
    <View style={styles.petCardContainer}>
      <View style={styles.petCard}>
        <Image
          source={{ uri: petDetails?.imageUrl ? petDetails.imageUrl : 'https://via.placeholder.com/80' }}
          style={styles.petImage}
        />
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{petDetails?.name || 'Loading...'}</Text>
          {petDetails && (
            <Text style={styles.petDetails}>
              {`${petDetails.petType} ${petDetails.gender}, ${petDetails.weight}kg, ${petDetails.age}세`}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.deviceStatus} onPress={toggleDropdown}>
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.watchIcon} />
          <Text style={styles.deviceStatusText}>{selectedDevice ? selectedDevice.name : 'Select Device'}</Text>
        </TouchableOpacity>
      </View>
      <DropdownModal
        isVisible={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        devices={devices}
        onSelect={selectDevice}
      />
    </View>
    </TouchableOpacity>
  );
};


const AddPetButton: React.FC = () => (
  <TouchableOpacity style={styles.addPetButton}>
    <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.addPetIcon} />
    <Text style={styles.addPetText}>반려동물 추가</Text>
  </TouchableOpacity>
);

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

  const handleLogout = async () => {
    try {
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        console.log('JSESSIONID not found');
        return;
      }

      const response = await fetch('http://52.79.140.133:8080/api/v1/oauth2/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `JSESSIONID=${jsessionid}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem('JSESSIONID');
        await AsyncStorage.removeItem('USER_DATA');

        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        console.log('Failed to logout:', response.status);
        Alert.alert('오류', '로그아웃에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsessionid = await AsyncStorage.getItem('JSESSIONID');
        if (!jsessionid) {
          console.log('JSESSIONID not found');
          return;
        }

        const userResponse = await fetch('http://52.79.140.133:8080/api/v1/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${jsessionid}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          await AsyncStorage.setItem('USER_DATA', JSON.stringify(userData));
          setUsername(userData.name);
          setUserData(userData);
        } else {
          console.log('Failed to fetch user data:', userResponse.status);
        }

        const petResponse = await fetch('http://52.79.140.133:8080/api/v1/users/pets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${jsessionid}`,
          },
        });

        if (petResponse.ok) {
          const { pets } = await petResponse.json();
          const ids = pets.map((pet: any) => pet.id);
          setPetIds(ids); 
      } else {
          console.log('Failed to fetch pet data:', petResponse.status);
      }
      } catch (error) {
        console.error('Error fetching user or pet data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderPetItem = ({ item }: { item: string }) => <PetCard petId={item} devices={deviceData} />;
  const renderDeviceItem = ({ item }: { item: Device }) => <DeviceCard device={item} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.profileImage} />
        <Text style={styles.greeting}>안녕하세요 <Text style={{ color: 'skyblue' }}>{username}!</Text></Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editProfileText}>내 정보 관리하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}><Text style={{ color: 'skyblue' }}>{username}</Text>의 반려동물</Text>
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
          <Text style={styles.sectionTitle}><Text style={{ color: 'skyblue' }}>{username}</Text>의 기기</Text>
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
