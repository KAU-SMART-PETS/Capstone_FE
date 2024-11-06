import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';
import SquareBox from '@common/SquareBox'; // SquareBox 컴포넌트 임포트
import { useNavigation } from '@react-navigation/native';
import { foodsList } from '@api/foodApi';

interface Food {
  id: number;
  imageUrl: string;
  price: number;
}

const ViewFeedList: React.FC = () => {
  const navigation = useNavigation();
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await foodsList();
      if (data) {
        setFoods(data.foods || []);
      } else {
        console.log('Failed to load foods');
      }
    };
    fetchFoods();
  }, []);

  // 구매하기 버튼 핸들러
  const handlePurchase = () => {
    navigation.navigate('PaymentInformation');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
        <StylizedText type="header1" styleClass="text-black mb-6">
          구매하실 수 있는{"\n"}제품을 소개해드릴게요!
        </StylizedText>
      </View>

      {/* Food Display */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
          {foods.map((food) => (
            <View key={food.id} className="mb-4 mx-2">{/* 한 행에 2개씩 배치 */}
              <SquareBox
                backgroundColor="bg-white"
                outline="inactive-solid"
                rounded="xl"
                size="md"
              >
                <View style={{ alignItems: 'center' }}>
                  <Avatar source={{ uri: food.imageUrl }} size={60} />
                  <Text style={{ marginTop: 8 }}>
                    <StylizedText type="body1">{`사료 ${food.id}`}</StylizedText>
                  </Text>
                  <Text style={{ color: 'black', marginTop: 4 }}>
                    <StylizedText type="body2">{`${food.price.toLocaleString()} P`}</StylizedText>
                  </Text>
                </View>
              </SquareBox>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Footer Button */}
      <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16 }}>
        <RoundedTextButton
          content="구매하기"
          widthOption="full"
          onPress={handlePurchase}
        />
      </View>
    </View>
  );
};

export default ViewFeedList;
