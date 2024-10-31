import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterHealthInfo = ({ route }) => {
  const petId = route.params;

  const [healthInfo, setHealthInfo] = useState([]);
  const [petName, setPetName] = useState('');
  const [newInfo, setNewInfo] = useState({ date: '', name: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  useEffect(() => {
    const fetchHealthInfo = async () => {
      try {
        const jsessionId = await AsyncStorage.getItem('JSESSIONID');
        const response = await axios.get(`http://52.79.140.133:8080/api/v1/pets/${petId}/vaccination`, {
          headers: {
            Cookie: `JSESSIONID=${jsessionId}`,
          },
        });

        const { pet, vaccination } = response.data;
        setPetName(pet.name);
        setHealthInfo(
          vaccination.map(v => ({
            id: v.id,
            name: v.name,
            date: `${v.year}${String(v.month).padStart(2, '0')}${String(v.day).padStart(2, '0')}`,
          }))
        );
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        Alert.alert('오류', '보건 정보를 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchHealthInfo();
  }, [petId]);

  const handleSaveInfo = async () => {
    if (newInfo.date && newInfo.name) {
      if (newInfo.date.length !== 8) {
        Alert.alert('날짜 형식 오류', '날짜는 YYYYMMDD 형식으로 8자리 숫자여야 합니다.');
        return;
      }

      try {
        const year = parseInt(newInfo.date.slice(0, 4), 10);
        const month = parseInt(newInfo.date.slice(4, 6), 10);
        const day = parseInt(newInfo.date.slice(6, 8), 10);
        const jsessionId = await AsyncStorage.getItem('JSESSIONID');

        if (selectedVaccination) {
          console.log(selectedVaccination);

          await axios.put(
            `http://52.79.140.133:8080/api/v1/pets/${petId}/vaccination/${selectedVaccination.id}`,
            {
              name: newInfo.name,
              year: year,
              month: month,
              day: day,
            },
            {
              headers: {
                Cookie: `JSESSIONID=${jsessionId}`,
              },
            }
          );

          setHealthInfo(
            healthInfo.map(item => 
              item.id === selectedVaccination.id 
                ? { ...item, name: newInfo.name, date: `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}` }
                : item
            )
          );
          Alert.alert("수정 성공", "보건 정보가 수정되었습니다.");

        } else {
          // 추가 (POST 요청)
          const response = await axios.post(
            `http://52.79.140.133:8080/api/v1/pets/${petId}/vaccination`,
            {
              name: newInfo.name,
              year: year,
              month: month,
              day: day,
            },
            {
              headers: {
                Cookie: `JSESSIONID=${jsessionId}`,
              },
            }
          );

          setHealthInfo([
            ...healthInfo,
            { ...newInfo, id: response.data.id } 
          ]);
          Alert.alert("추가 성공", "새로운 보건 정보가 추가되었습니다.");
        }

        setNewInfo({ date: '', name: '' });
        setIsModalVisible(false);
        setSelectedVaccination(null);

      } catch (error) {
        console.error("서버 요청 중 오류:", error);
        Alert.alert('오류', '서버에 데이터를 전송하는 중 문제가 발생했습니다.');
      }
    } else {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
    }
  };

  const handleDelete = async () => {
    try {
      const jsessionId = await AsyncStorage.getItem('JSESSIONID');
      await axios.delete(`http://52.79.140.133:8080/api/v1/pets/${petId}/vaccination/${selectedVaccination.id}`, {
        headers: {
          Cookie: `JSESSIONID=${jsessionId}`,
        },
      });
      setHealthInfo(healthInfo.filter(item => item.id !== selectedVaccination.id));
      setIsDetailModalVisible(false);
      Alert.alert("삭제 성공", "보건 정보가 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 오류:", error);
      Alert.alert("오류", "보건 정보를 삭제하는 중 문제가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    setNewInfo({ date: selectedVaccination.date, name: selectedVaccination.name });
    setIsDetailModalVisible(false);
    setIsModalVisible(true);
  };

  const renderHealthInfoItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedVaccination(item); setIsDetailModalVisible(true); }}>
      <View style={styles.healthInfoCard}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={{ color: 'black' }}>접종 시기: {formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDateChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setNewInfo({ ...newInfo, date: numericValue });
  };

  const formatDate = (dateString) => {
    if (dateString && dateString.length === 8) {
      return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`;
    }
    return dateString || '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{petName}의 보건 정보</Text>
      <FlatList
        data={healthInfo}
        renderItem={renderHealthInfoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.healthInfoGrid}
      />

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>보건정보 추가하기</Text>
      </TouchableOpacity>

      {/* 보건정보 추가/수정 모달 */}
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
              <TouchableOpacity onPress={handleSaveInfo} style={styles.addButton}>
                <Text style={styles.addButtonText}>저장</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 상세 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDetailModalVisible}
        onRequestClose={() => setIsDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>보건 정보</Text>
            <Text>접종 시기: {formatDate(selectedVaccination?.date)}</Text>
            <Text>접종 정보: {selectedVaccination?.name}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                <Text style={styles.editButtonText}>수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>삭제하기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsDetailModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>닫기</Text>
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
    justifyContent: 'space-between',
    marginTop: 20,
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
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default RegisterHealthInfo;
