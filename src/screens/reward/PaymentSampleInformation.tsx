import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import StylizedText from '@common/StylizedText';
import CustomTextInput from '@common/CustomTextInput';
import RadioButtonGroup from '@common/RadioButtonGroup';
import RadioButton from '@common/RadioButton';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalLayout from '@components/ModalLayout';
import { ProgressDots } from '@common/Loading';
import { foodsList } from '@api/foodApi';
import { usePoints } from '@api/pointApi';
import { fetchPointHistory } from '@api/pointApi';
import { fetchUserProfile } from '@api/userApi';

const PaymentSampleInformation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { zonecode = '', address = '', defaultAddress = '' } = route.params || {};
  const [foods, setFoods] = useState([]);
  const [balance, setBalance] = useState(0);
  const [selectedFoodIds, setSelectedFoodIds] = useState<number[]>([]);
  const [deliveryFee] = useState(2500); // 배송비 고정
  const [userData, setUserData] = useState({ name: '', email: '', phoneNumber: '' });
  const [postalCode, setPostalCode] = useState(zonecode || '');
  const [fullAddress, setFullAddress] = useState(
    address && defaultAddress ? `${address} ${defaultAddress}` : ''
  );
  const [detailAddress, setDetailAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const radioButtonGroupRef = useRef<any>(null);
  const [inputType, setInputType] = useState<'editableWithButton' | 'freeText'>();

  // Fetch foods and user data
  const fetchFoods = async () => {
    try {
      const data = await foodsList();
      if (data) {
        setFoods(data.foods || []);
      } else {
        throw new Error('Failed to load foods');
      }
    } catch (error) {
      throw new Error('Failed to fetch foods');
    }
  };

  const fetchUserData = async () => {
    const userProfile = await fetchUserProfile();
    if (userProfile) {
      setUserData({
        name: userProfile.name,
        email: userProfile.email || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
      return userProfile; // userData 반환
    } else {
      console.log('Failed to load user profile');
      return {};
    }
  };

  const fetchUserBalance = async () => {
    try {
      const pointHistory = await fetchPointHistory();
      if (pointHistory && pointHistory.history.length > 0) {
        const latestPoint = pointHistory.history[0].totalPoint;
        setBalance(latestPoint);
      } else {
        console.log('Failed to fetch user points');
        throw new Error('Failed to fetch user points');
      }
    } catch (error) {
      throw new Error('Failed to fetch balance');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodsResult = await fetchFoods();
        console.log('Foods fetched:', foodsResult);
        const balanceResult = await fetchUserBalance();
        console.log('User balance fetched:', balanceResult);
        const userDataResult = await fetchUserData();
        console.log('User data fetched:', userDataResult);
  
        // User phone number type 설정
        setInputType(userDataResult.phoneNumber ? 'editableWithButton' : 'freeText');
      } catch (error) {
        console.error('Fetch data error:', error.message || error);
        setModalMessage('오류가 발생했습니다. 다시 시도해주세요.');
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params) {
      const { zonecode, address, defaultAddress } = route.params;

      if (zonecode) {
        setPostalCode(zonecode);
      }
      if (address || defaultAddress) {
        const formattedAddress = defaultAddress
          ? `${address} ${defaultAddress}`
          : address;
        setFullAddress(formattedAddress || '');
      }
    }
  }, [route.params]);

  const handleOrderSubmit = async () => {
    if (!detailAddress || !userData.phoneNumber || !postalCode) {
      setModalMessage('주문 정보를 바르게 입력했는지 확인해 주세요.');
      setModalVisible(true);
      return;
    }

    if (radioButtonGroupRef.current) {
      radioButtonGroupRef.current.submit();
    }

    if (balance < deliveryFee) {
      setModalMessage('보유 포인트가 결제 금액보다 적습니다.');
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

  const placeholderValue = Math.min(deliveryFee, balance);

  if (loading) {
    return <ProgressDots />;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-5">
        <StylizedText type="header1" styleClass="text-black mb-4 mx-2 mt-6">
          사료 샘플을 선택하고{"\n"}주문 정보를 입력해주세요.
        </StylizedText>

        <RadioButtonGroup
          ref={radioButtonGroupRef}
          maxChoice={1} // 최대 1개의 사료 선택
          onSubmit={(selectedIndexes) => {
            const selectedIds = selectedIndexes.map((index) => foods[index]?.id);
            setSelectedFoodIds(selectedIds);
          }}
          onSelect={(selectedIndexes) => {
            const selectedIds = selectedIndexes.map((index) => foods[index]?.id);
            setSelectedFoodIds(selectedIds);
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
        <View className="flex-row items-center w-full">
          <View className="flex-1">
            <CustomTextInput
              label="우편 번호"
              placeholder="우편번호를 검색해주세요."
              value={postalCode}
              type="readOnly"
              keyboardType="default"
            />
          </View>
          <View className="w-1/3">
            <RoundedTextButton content="주소 검색" widthOption="sm" onPress={() => navigation.navigate('SearchAddress')} />
          </View>
        </View>
        <CustomTextInput
          label="주소"
          placeholder="주소를 검색해주세요."
          value={fullAddress}
          type="readOnly"
          keyboardType="default"
        />
        <CustomTextInput
          label="상세 주소"
          placeholder="상세 주소를 입력해주세요"
          value={detailAddress}
          onChangeText={setDetailAddress}
          type="freeText"
          keyboardType="default"
        />
        <CustomTextInput
          label="휴대폰 번호"
          placeholder="휴대폰 번호를 입력해주세요."
          value={userData.phoneNumber}
          onChangeText={(text) => setUserData((prev) => ({ ...prev, phoneNumber: text }))}
          isEditableInitially={!userData.phoneNumber}
          type={inputType}
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
            placeholder={`${placeholderValue.toLocaleString()} P`}
            isEditableInitially={false}
            type="readOnly"
            keyboardType="numeric"
          />
          <StylizedText
            type="body2"
            styleClass={`mb-2 ${balance < deliveryFee ? 'text-danger' : 'text-grey'}`}
          >
            {`보유 잔액 ${balance.toLocaleString()} P`}
          </StylizedText>
        </View>

        <View className="mt-6 border-t border-grey pt-4">
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
        setVisible={(visible) => {
          setModalVisible(visible);
        }}
        title={modalMessage}
        rows={[
          {
            content: [
              <RoundedTextButton
                content="확인"
                onPress={() => {
                  setModalVisible(false);
                  if (modalMessage === '오류가 발생했습니다. 다시 시도해주세요.') {
                    navigation.goBack();
                  }
                }}
              />,
            ],
          },
        ]}
      />
    </View>
  );
};

export default PaymentSampleInformation;
