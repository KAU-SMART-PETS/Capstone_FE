import React, { useEffect, useState } from 'react'; 
import { View, ScrollView, Text } from 'react-native'; 
import StylizedText from '@common/StylizedText'; 
import Avatar from '@common/Avatar'; 
import { RoundedTextButton } from '@components/common/RoundedButton'; 
import RoundedBox from '@common/RoundedBox';
import { useNavigation } from '@react-navigation/native'; 
import { foodsList } from '@api/foodApi'; 
 
interface Food { 
  id: number; 
  imageUrl: string; 
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
    <View className="flex-1 bg-white"> 
      {/* Header */} 
      <View className="px-5 pt-10"> 
        <StylizedText type="header1" styleClass="text-black mb-1"> 
          구매하실 수 있는{"\n"}제품을 소개해드릴게요! 
        </StylizedText> 
        <StylizedText type="body1" styleClass="text-grey mb-6">리워드를 수행하고 얻은 포인트로 사료를 구매할 수 있습니다!</StylizedText> 
      </View> 
 
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}>
        <View className="flex flex-col space-y-4 m-4">
          {foods.map((food) => (
            <View key={food.id}>
              <RoundedBox preset="A" shadow={true} outline="solid">
                <View className="flex-row items-center px-4 py-2">
                  <Avatar source={{ uri: food.imageUrl }} size={60} />
                  <View className="ml-4 flex-1">
                    <StylizedText type="header2" styleClass="text-black">{`사료 ${food.id}`}</StylizedText>
                    <StylizedText type="body1" styleClass="text-grey">
                      이곳에 제품의 설명 글이 들어갑니다.
                    </StylizedText>
                  </View>
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
