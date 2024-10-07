import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from 'react-native';

// Mock data for pet health information
const mockHealthInfo = [
  { id: '1', date: '2024-03-15', name: '광견병 예방접종' },
  { id: '2', date: '2024-04-01', name: '심장사상충 예방' },
];

const mockPetData = {
  name : '하늘',
}

const RegisterHealthInformation = () => {
  const [healthInfo, setHealthInfo] = useState(mockHealthInfo);
  const [newInfo, setNewInfo] = useState({ date: '', name: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddInfo = () => {
    if (newInfo.date && newInfo.name) {
      if (newInfo.date.length !== 8) {
        Alert.alert('날짜 형식 오류', '날짜는 YYYYMMDD 형식으로 8자리 숫자여야 합니다.');
        return;
      }
      setHealthInfo([...healthInfo, { ...newInfo, id: Date.now().toString() }]);
      setNewInfo({ date: '', name: '' });
      setIsModalVisible(false);
    } else {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
    }
  };
  const handleDateChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setNewInfo({ ...newInfo, date: numericValue });
  };
  const formatDate = (dateString) => {
    if (dateString.length === 8) {
      return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`;
    }
    return dateString;
  };

  const renderHealthInfoItem = ({ item }) => (
    <View style={styles.healthInfoCard}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={{color: 'black'}}>접종 시기: {formatDate(item.date)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mockPetData.name}의 보건 정보</Text>
      <FlatList
        data={healthInfo}
        renderItem={renderHealthInfoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.healthInfoGrid}
      />
      
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>보건정보 추가하기</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>새 보건정보 추가</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>접종 시기</Text>
              <TextInput
                value={newInfo.date}
                onChangeText={handleDateChange}
                style={styles.input}
                placeholder="YYYYMMDD"
                placeholderTextColor={styles.placeholderText.color}
                keyboardType="numeric"
                maxLength={8}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>접종 정보</Text>
              <TextInput
                value={newInfo.name}
                onChangeText={(text) => setNewInfo({ ...newInfo, name: text })}
                style={styles.input}
                placeholder="예: 광견병 예방접종"
                placeholderTextColor={styles.placeholderText.color}
              />
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={handleAddInfo} style={styles.addButton}>
                <Text style={styles.addButtonText}>추가</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  healthInfoGrid: {
    flexGrow: 1,
  },
  healthInfoCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#73A8BA',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    color: 'black',
    backgroundColor: '#fefefe',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: 'black',
    marginBottom: 5,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  placeholderText: {
    color: '#888', 
  },
});

export default RegisterHealthInformation;