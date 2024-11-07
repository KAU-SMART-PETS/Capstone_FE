import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Alert, ActivityIndicator,
} from 'react-native';
import {
  fetchHealthInfo, addVaccination, updateVaccination, deleteVaccination
} from '@src/api/vaccinationApi2';
import CustomTextInput from '@common/CustomTextInput';
import { RoundedTextButton } from '@src/components/common/RoundedButton';
import ModalLayout from '@src/components/ModalLayout';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylizedText, { HeaderText } from '@src/components/common/StylizedText';
import { VaccinationCard } from '@src/components/InfoCards';


const RegisterHealthInfo = (id = 0) => {
  const petId = id.route.params.id;

  const [healthInfo, setHealthInfo] = useState([]);
  const [petName, setPetName] = useState('');
  const [newInfo, setNewInfo] = useState({ date: '', name: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHealthInfo(petId);
      setPetName(data.petName);
      setHealthInfo(data.healthInfo);

      if (selectedVaccination && !data.healthInfo.find(item => item.id === selectedVaccination.id)) {
        setSelectedVaccination(null);
      }
    };

    fetchData();
  }, [petId, reloadKey]);

  const handleSaveInfo = async () => {
    if (newInfo.date && newInfo.name) {
      if (newInfo.date.length !== 8) {
        Alert.alert('날짜 형식 오류', '날짜는 YYYYMMDD 형식으로 8자리 숫자여야 합니다.');
        return;
      }

      try {
        setIsLoading(true);

        if (selectedVaccination) {
          await updateVaccination(petId, selectedVaccination.id, newInfo.name, newInfo.date);
        } else {
          await addVaccination(petId, newInfo.name, newInfo.date);
        }

        const data = await fetchHealthInfo(petId);
        setPetName(data.petName);
        setHealthInfo(data.healthInfo);

        setNewInfo({ date: '', name: '' });
        setIsModalVisible(false);
        setSelectedVaccination(null);
        setReloadKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error('오류:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
    }
  };

  const handleDelete = async () => {
    if (!selectedVaccination) {
      Alert.alert('오류', '선택된 보건 정보가 없습니다.');
      return;
    }

    try {
      setIsLoading(true);

      await deleteVaccination(petId, selectedVaccination.id);

      setIsDetailModalVisible(false);
      setSelectedVaccination(null);
      setReloadKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('삭제 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (!selectedVaccination) {
      Alert.alert('오류', '선택된 보건 정보가 없습니다.');
      return;
    }

    setNewInfo({ date: selectedVaccination.date, name: selectedVaccination.name });
    setIsDetailModalVisible(false);
    setIsModalVisible(true);
  };

  const renderHealthInfoItem = ({ item }) => (
    <VaccinationCard
      title={item.name}
      description={`${formatDate(item.date)} 에 접종되었습니다.`}
      onPress={() => {
        console.log(item.id);
        setSelectedVaccination(item);
        setIsDetailModalVisible(true);
      }}
    />
  );
  

  const handleDateChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setNewInfo({ ...newInfo, date: numericValue });
  };

  const formatDate = dateString => {
    if (dateString && dateString.length === 8) {
      return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`;
    }
    return dateString || '';
  };

  return (
  <View className="flex-1 p-5 bg-white">
      <HeaderText
        text={`${petName}의 보건정보`}
        highlight={petName}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-5" />
      ) : (
        <FlatList
          data={healthInfo}
          renderItem={renderHealthInfoItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}

      <RoundedTextButton 
        color="bg-primary" 
        icon={<MCIcon name="note-plus" color="black" size={20} />} 
        textColor="text-white" content="보건정보 추가하기" 
        widthOption='full'
        onPress={() => setIsModalVisible(true)}/>
        
      {/* 보건정보 추가/수정 모달 */}
      <ModalLayout
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        position="bottom"
        title={selectedVaccination ? '보건정보 수정' : '새 보건정보 추가'}
        titleAlign="left"
        rows={[
          {
            content: [
              <View
                key="date"
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <CustomTextInput
                  label="날짜"
                  value={newInfo.date}
                  onChangeText={handleDateChange}
                  placeholder="YYYYMMDD"
                  keyboardType="numeric"
                  maxLength={8}
                  type="freeText"
                />
              </View>,
              <View
                key="info"
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <CustomTextInput
                  label="접종 정보"
                  value={newInfo.name}
                  onChangeText={(text) => setNewInfo({ ...newInfo, name: text })}
                  placeholder="예: 광견병 예방접종"
                  type="freeText"
                />
              </View>,
            ],
          },
          {
            content: [
              <RoundedTextButton
                key="save"
                content="저장"
                color="bg-primary"
                widthOption="sm"
                onPress={handleSaveInfo}
              />,
              <RoundedTextButton
                key="cancel"
                content="취소"
                color="bg-secondary"
                widthOption="sm"
                onPress={() => {
                  setIsModalVisible(false);
                  setSelectedVaccination(null);
                  setNewInfo({ date: '', name: '' });
                }}
              />,
            ],
            layout: 'row',
          },
        ]}
      />

      {/* 상세 모달 */}
      <ModalLayout
        visible={isDetailModalVisible}
        setVisible={setIsDetailModalVisible}
        position="center"
        title="보건 정보"
        titleAlign="center"
        rows={[
          {
            content: [
              <StylizedText key="date" type='body1'>
                접종 시기: {formatDate(selectedVaccination?.date)}
              </StylizedText>,
              <StylizedText key="info" type='body1'>
                접종 정보: {selectedVaccination?.name}
              </StylizedText>,
            ],
          },
          {
            content: [
              <RoundedTextButton 
                color="bg-safe" 
                icon={<MCIcon name="lead-pencil" color="black" size={20} />} 
                textColor="text-black" 
                content="수정"
                widthOption='xs'
                onPress={handleEdit} />,
              <RoundedTextButton 
                color="bg-danger" 
                icon={<MCIcon name="delete" color="black" size={20} />} 
                textColor="text-black" 
                content="삭제"
                widthOption='xs'
                onPress={handleDelete} />,
              <RoundedTextButton 
                color="bg-secondary" 
                icon={<MCIcon name="close" color="black" size={20} />} 
                textColor="text-black" 
                content="닫기"
                widthOption='xs'
                onPress={() => {
                  setIsDetailModalVisible(false);
                  setSelectedVaccination(null);
                }} />,
            ],
            layout: 'row', 
          },
        ]}
      />
    </View>
  );
};

export default RegisterHealthInfo;
