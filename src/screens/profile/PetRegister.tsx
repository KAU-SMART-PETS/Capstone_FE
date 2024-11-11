import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, FlatList, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { BleManager } from 'react-native-ble-plx';
import emptyCircleFrame from '@image/frame/addPetCircle.png';

const PetRegister = () => {
  const navigation = useNavigation();
  const [petType, setPetType] = useState<'강아지' | '고양이' | ''>('');
  const [gender, setGender] = useState<'암' | '수' | ''>('');
  const [petImage, setPetImage] = useState<string | null>(null);
  const [bluetoothDevice, setBluetoothDevice] = useState<{ id: string; name: string } | null>(null);
  const [devices, setDevices] = useState<Array<{ id: string; name: string }>>([]);
  const [scanning, setScanning] = useState(false);
  const [showDeviceList, setShowDeviceList] = useState(false);
  
  const bleManager = new BleManager();

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setPetImage(response.assets[0].uri);
      }
    });
  };

  const handleBluetoothInputPress = () => {
    setShowDeviceList(true);
    startBluetoothScan();
  };

  const startBluetoothScan = () => {
    setDevices([]); // Clear existing devices
    setScanning(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Error during scan:", error);
        setScanning(false);
        return;
      }

      if (device && device.name) {
        setDevices((prevDevices) => {
          if (!prevDevices.find(d => d.id === device.id)) {
            return [...prevDevices, { id: device.id, name: device.name }];
          }
          return prevDevices;
        });
      }
    });

    // Stop scanning after 10 seconds
    setTimeout(() => {
      stopBluetoothScan();
    }, 10000);
  };

  const stopBluetoothScan = () => {
    bleManager.stopDeviceScan();
    setScanning(false);
  };

  const handleDeviceSelect = (device: { id: string; name: string }) => {
    setBluetoothDevice(device);
    setShowDeviceList(false);
    stopBluetoothScan();
  };

  useEffect(() => {
    return () => {
      bleManager.destroy();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
            <Image 
              source={petImage ? { uri: petImage } : emptyCircleFrame} 
              style={styles.image} 
            />
            <Text style={styles.imageText}>눌러서 사진 변경</Text>
          </TouchableOpacity>
          
          <TextInput style={styles.input} placeholder="이름" placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="견종 / 묘종" placeholderTextColor="#888" />
          <TextInput style={styles.input} placeholder="체중 (kg)" placeholderTextColor="#888" keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="나이" placeholderTextColor="#888" />
          
          <TouchableOpacity
            style={styles.input}
            onPress={handleBluetoothInputPress}
          >
            <Text style={styles.bluetoothText}>
              {bluetoothDevice 
                ? `선택된 기기: ${bluetoothDevice.name} (${bluetoothDevice.id})` 
                : 'Bluetooth 기기 선택'}
            </Text>
          </TouchableOpacity>

          <View style={styles.optionContainer}>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setPetType(petType === '강아지' ? '' : '강아지')}
              >
                <View style={[styles.checkbox, petType === '강아지' && styles.checkedBox]}>
                  {petType === '강아지' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>강아지</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setPetType(petType === '고양이' ? '' : '고양이')}
              >
                <View style={[styles.checkbox, petType === '고양이' && styles.checkedBox]}>
                  {petType === '고양이' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>고양이</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.spacer} />

          <View style={styles.optionContainer}>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setGender(gender === '암' ? '' : '암')}
              >
                <View style={[styles.checkbox, gender === '암' && styles.checkedBox]}>
                  {gender === '암' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>암</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainerSex}
                onPress={() => setGender(gender === '수' ? '' : '수')}
              >
                <View style={[styles.checkbox, gender === '수' && styles.checkedBox]}>
                  {gender === '수' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>수</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showDeviceList}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bluetooth 기기 목록</Text>
            {scanning && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
              data={devices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.deviceItem}
                  onPress={() => handleDeviceSelect(item)}
                >
                  <Text>{item.name || 'Unnamed Device'}</Text>
                  <Text style={styles.deviceId}>{item.id}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyListText}>
                  {scanning ? '기기를 검색 중입니다...' : '발견된 기기가 없습니다.'}
                </Text>
              }
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowDeviceList(false);
                stopBluetoothScan();
              }}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#888',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  imageText: {
    marginTop: 10,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    color: '#888',
  },
  optionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  optionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingRight: 85,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  checkboxContainerSex: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    color: 'black',
    borderBottomColor: '#ccc',
  },
  deviceId: {
    fontSize: 12,
    color: '#888',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
  },
  bluetoothText: {
    color: '#888',
  },
});

export default PetRegister;
