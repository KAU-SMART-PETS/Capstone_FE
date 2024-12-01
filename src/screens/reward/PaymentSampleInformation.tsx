import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import StylizedText from '@common/StylizedText';
import CustomTextInput from '@common/CustomTextInput';
import RadioButtonGroup from '@common/RadioButtonGroup';
import RadioButton from '@common/RadioButton';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@common/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import ModalLayout from '@components/ModalLayout';
import { foodsList } from '@api/foodApi'; // 사료 리스트만 사용
import { fetchPointHistory } from '@api/pointApi'; // 포인트 잔액 조회
import { fetchUserProfile } from '@api/userApi';
import { usePoints } from '@api/pointApi'; // 포인트 차감 API

const PaymentSampleInformation: React.FC = () => {
  const navigation = useNavigation();
  const [foods, setFoods] = useState([]);
  const [selectedFoodIds, setSelectedFoodIds] = useState<number[]>([]);
  const [deliveryFee] = useState(2500); // 고정 배송비
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState({ name: '', email: '', phoneNumber: '' });
  const [address, setAddress] = useState('');
  const radioButtonGroupRef = useRef<any>(null);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 사료 리스트 불러오기
  const fetchFoods = async () => {
    const data = await foodsList();
    if (data) {
      setFoods(data.foods || []);
    } else {
      console.log('Failed to load foods');
    }
  };

  // 사용자 포인트 잔액 불러오기
  const fetchUserBalance = async () => {
    const pointHistory = await fetchPointHistory();
    if (pointHistory && pointHistory.history.length > 0) {
      const latestPoint = pointHistory.history[0].totalPoint;
      setBalance(latestPoint);
    } else {
      console.log('Failed to fetch user points');
    }
  };

  // 사용자 정보 불러오기
  const fetchUserData = async () => {
    const userProfile = await fetchUserProfile();
    if (userProfile) {
      setUserData({
        name: userProfile.name,
        email: userProfile.email || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    } else {
      console.log('Failed to load user profile');
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchUserBalance();
    fetchUserData();
  }, []);

  const handleOrderSubmit = async () => {
    // 배송지 정보 검증
    if (!address || !userData.phoneNumber) {
      setModalMessage('배송지 정보 입력을 바르게 했는지 확인해주세요.');
      setModalVisible(true);
      return;
    }

    if (radioButtonGroupRef.current) {
      radioButtonGroupRef.current.submit();
    }

    if (balance < deliveryFee) {
      setModalMessage('보유 포인트가 배송비보다 적습니다.');
      setModalVisible(true);
      return;
    }

    // 포인트 차감
    const isSuccess = await usePoints(deliveryFee);
    if (!isSuccess) {
      setModalMessage('배송비 결제에 실패했습니다.');
      setModalVisible(true);
      return;
    }

    // 주문 성공 시 OrderReceived로 이동
    navigation.navigate('OrderReceived', { product: '사료 샘플' });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-5">
        <StylizedText type="header1" styleClass="text-black mb-4 mx-2 mt-6">
          사료 샘플을 선택하고 주문 정보를 입력해주세요.
        </StylizedText>

        <RadioButtonGroup
          ref={radioButtonGroupRef}
          maxChoice={1} // 샘플은 1개만 선택 가능
          onSubmit={(selectedIndexes) => {
            const selectedIds = selectedIndexes.map((index) => foods[index]?.id);
            setSelectedFoodIds(selectedIds);
            console.log('현재 선택된 food ID 배열 (onSubmit):', selectedIds);
          }}
          onSelect={(selectedIndexes) => {
            const selectedIds = selectedIndexes.map((index) => foods[index]?.id);
            setSelectedFoodIds(selectedIds);
            console.log('현재 선택된 food ID 배열 (onSelect):', selectedIds);
          }}
          containerStyle="flex-row flex-wrap justify-around mb-2"
        >
          {foods.map((food) => (
            <RadioButton key={food.id}>
              <Avatar size={80} source={{ uri: food.imageUrl }} />
              <StylizedText type="body2" styleClass="text-center mt-2">{`사료 ${food.id}`}</StylizedText>
            </RadioButton>
          ))}
        </RadioButtonGroup>

        <CustomTextInput
          label="주문자명"
          value={userData.name}
          isEditableInitially={false}
          type="readOnly"
        />
        <CustomTextInput
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={userData.email}
          keyboardType="email-address"
          type="freeText"
        />
        <CustomTextInput
          label="주소"
          placeholder="주소를 입력해주세요"
          value={address}
          onChangeText={setAddress}
          type="freeText"
          keyboardType="default"
        />
        <CustomTextInput
          label="휴대폰 번호"
          placeholder="010-1234-5678"
          value={userData.phoneNumber}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, phoneNumber: text }))}
          isEditableInitially={!userData.phoneNumber}
          type={userData.phoneNumber ? 'editableWithButton' : 'freeText'}
          keyboardType="phone-pad"
        />

        <View className="mt-6">
          <StylizedText type="header2" styleClass="text-black mb-2">
            결제 수단
          </StylizedText>
          <StylizedText type="body2" styleClass="text-grey mb-2">
            ⓘ 배송비는 포인트에서 차감됩니다.
          </StylizedText>
          <CustomTextInput
            label="포인트"
            placeholder={`${deliveryFee.toLocaleString()} P`}
            isEditableInitially={false}
            type="readOnly"
            keyboardType="numeric"
          />
          <StylizedText
            type="body2"
            styleClass={`mb-2 ${balance < deliveryFee ? 'text-danger' : 'text-grey'}`}
          >
            보유 잔액 {balance.toLocaleString()} P
          </StylizedText>
        </View>

        <View className="mt-6 border-t border-grey pt-4">
          <StylizedText type="header2" styleClass="text-black mb-2">
            결제 정보
          </StylizedText>
          <View className="flex-row justify-between mb-1">
            <StylizedText type="body2" styleClass="text-grey">
              배송비
            </StylizedText>
            <StylizedText type="body2" styleClass="text-black">
              {deliveryFee.toLocaleString()} P
            </StylizedText>
          </View>
        </View>

        <View className="fixed bottom-0 left-0 right-0 p-5">
          <RoundedTextButton content="결제하기" widthOption="xl" onPress={handleOrderSubmit} />
        </View>
      </ScrollView>

      <ModalLayout
        visible={modalVisible}
        setVisible={setModalVisible}
        title={modalMessage}
        rows={[{ content: [<RoundedTextButton content="확인" onPress={() => setModalVisible(false)} />] }]}
      />
    </View>
  );
};

export default PaymentSampleInformation;