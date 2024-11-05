import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import StylizedText from '@common/StylizedText';
import CustomTextInput from '@common/CustomTextInput';
import RadioButtonGroup from '@common/RadioButtonGroup';
import RadioButton from '@common/RadioButton';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@common/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import { foodsList, purchaseFood } from '@api/foodApi';
import { fetchPointHistory } from '@api/pointApi';
import { fetchUserProfile } from '@api/userApi';

const PaymentInformation: React.FC = () => {
  const navigation = useNavigation();
  const [foods, setFoods] = useState([]);
  const [selectedFoodIds, setSelectedFoodIds] = useState<number[]>([]);
  const [deliveryFee] = useState(2500);
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState({ name: '', email: '', phoneNumber: '' });
  const radioButtonGroupRef = useRef<any>(null);

  // 서버에서 사료 목록을 불러오기
  const fetchFoods = async () => {
    const data = await foodsList();
    if (data) {
      setFoods(data.foods || []);
    } else {
      console.log('Failed to load foods');
    }
  };

  // 최신 포인트 정보 가져오기
  const fetchUserBalance = async () => {
    const pointHistory = await fetchPointHistory();
    if (pointHistory && pointHistory.history.length > 0) {
      const latestPoint = pointHistory.history[0].totalPoint;
      setBalance(latestPoint);
    } else {
      console.log('Failed to fetch user points');
    }
  };

  // 사용자 프로필 정보 가져오기
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

  const selectedFoodsTotal = selectedFoodIds.reduce((total, foodId) => {
    const food = foods.find(f => f.id === foodId);
    return total + (food ? food.price : 0);
  }, 0);

  const finalTotal = selectedFoodsTotal + deliveryFee;

  const handleOrderSubmit = async () => {
    if (balance < finalTotal) {
      Alert.alert('잔액 부족', '보유 포인트가 결제 금액보다 적습니다.');
      return;
    }

    const purchaseResults = await Promise.all(
      selectedFoodIds.map(foodId => purchaseFood(foodId, deliveryFee))
    );

    const isPurchaseSuccessful = purchaseResults.every(result => result !== null);

    if (isPurchaseSuccessful) {
      Alert.alert('결제 성공', `사료가 성공적으로 결제되었습니다.\n선택한 사료 ID: ${selectedFoodIds.join(', ')}`);
      navigation.navigate('OrderReceived', { product: '사료' });
    } else {
      Alert.alert('결제 실패', '결제 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-5">
        <StylizedText type="header1" styleClass="text-black mb-4 mt-6">
          제품을 선택하고 주문 정보를 입력해주세요.
        </StylizedText>

        {/* 사료 선택 영역 */}
        <RadioButtonGroup
          ref={radioButtonGroupRef}
          maxChoice={foods.length}
          onSubmit={(selectedIds) => setSelectedFoodIds(selectedIds)}
          containerStyle="flex-row flex-wrap justify-around mb-6"
        >
          {foods.map((food) => (
            <RadioButton key={food.id} value={food.id}>
              <Avatar size={80} source={{ uri: food.imageUrl }} />
              <StylizedText type="body2" styleClass="text-center mt-2">{`사료 ${food.id}`}</StylizedText>
            </RadioButton>
          ))}
        </RadioButtonGroup>

        {/* 주문 정보 입력 */}
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
          value=""
          placeholder="주소를 입력하세요"
          onChangeText=""
          type="freeText"
        />
        <CustomTextInput
          label="휴대폰 번호"
          placeholder="010-1234-5678"
          value={userData.phoneNumber || ''}
          onChangeText={(text) => setUserData(prev => ({ ...prev, phoneNumber: text }))}
          isEditableInitially={!userData.phoneNumber}
          type={userData.phoneNumber ? 'editableWithButton' : 'freeText'}
          keyboardType="phone-pad"
        />

        {/* 결제 수단 및 잔액 표시 */}
        <View className="mt-6">
          <StylizedText type="header2" styleClass="text-black mb-2">결제 수단</StylizedText>
          <StylizedText type="body2" styleClass="text-grey mb-2">ⓘ 배송비는 포인트에서 차감됩니다.</StylizedText>
          <CustomTextInput label="포인트" placeholder="포인트 사용" keyboardType="numeric" />
          <StylizedText type="body2" styleClass="text-grey mb-2">보유 잔액 {balance.toLocaleString()} P</StylizedText>
        </View>

        {/* 결제 정보 */}
        <View className="mt-6 border-t border-grey pt-4">
          <StylizedText type="header2" styleClass="text-black mb-2">결제 정보</StylizedText>
          <View className="flex-row justify-between mb-1">
            <StylizedText type="body2" styleClass="text-grey">주문 상품</StylizedText>
            <StylizedText type="body2" styleClass="text-black">{selectedFoodsTotal.toLocaleString()} P</StylizedText>
          </View>
          <View className="flex-row justify-between mb-1">
            <StylizedText type="body2" styleClass="text-grey">배송비</StylizedText>
            <StylizedText type="body2" styleClass="text-black">{deliveryFee.toLocaleString()} P</StylizedText>
          </View>
          <View className="flex-row justify-between">
            <StylizedText type="body2" styleClass="text-grey">최종 결제 포인트</StylizedText>
            <StylizedText type="body2" styleClass="text-black">{finalTotal.toLocaleString()} P</StylizedText>
          </View>
        </View>

        <View className="fixed bottom-0 left-0 right-0 p-5">
          <RoundedTextButton content="결제하기" widthOption="xl" onPress={handleOrderSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentInformation;
