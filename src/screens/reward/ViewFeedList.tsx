import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { RoundedTextButton } from '@components/common/RoundedButton';
import RoundedBox from '@common/RoundedBox';
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
      <View className="px-5 pt-10">
        <StylizedText type="header1" styleClass="text-black mb-6">
          구매하실 수 있는{"\n"}제품을 소개해드릴게요!
        </StylizedText>
      </View>

      {/* Food Display */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}>
        <View className="flex flex-wrap flex-row justify-center">
        {foods.map((food) => (
          <View key={food.id} className="m-2">
            <RoundedBox
              preset="squarecard"
              shadow={false}
              outline="active-solid"
            >
              <View className="items-center">
                <Avatar source={{ uri: food.imageUrl }} size={60} />
                <StylizedText type="body1" styleClass="mt-3">
                  {`사료 ${food.id}`}
                </StylizedText>
                <StylizedText type="body2" styleClass="text-black mt-1">
                  {`${food.price.toLocaleString()} P`}
                </StylizedText>
              </View>
            </RoundedBox>
          </View>
        ))}
        </View>
      </ScrollView>

      {/* Fixed Footer Button */}
      <View className="absolute bottom-0 w-full p-4">
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
