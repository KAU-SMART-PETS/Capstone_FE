import React, { useState, useCallback } from "react";
import { View, ScrollView, SafeAreaView, Alert } from "react-native";
import { useNavigation, RouteProp, useFocusEffect } from "@react-navigation/native";
import { deletePet, getPetDetails } from "@src/api/petApi";
import StylizedText from "@common/StylizedText";
import Avatar from "@common/Avatar";
import AvatarPlaceholder from "@image/placeholder/dog.jpg";
import { HBarChart } from '@common/BarChart';
import { BackArrowHeader } from "@src/components/HeaderBar";
import Icon from "react-native-vector-icons/Ionicons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import RoundedBox from "@common/RoundedBox";
import { RoundedCircleButton } from "@common/RoundedButton";
//import { Shapes } from "react-native-background-shapes";
import ColorMap, { OpacityMap } from "@common/ColorMap";
import { PetDetails } from "@src/utils/constants/types";

// Mock 데이터
const mockData = {
  steps: {
    current: 1900,
    goal: 3000,
  },
  minutes: {
    current: 18,
    goal: 60,
  },
  estimatedCalories: 330,
};

const ActionButton = ({
  iconName,
  label,
  onPress,
}: {
  iconName: string;
  label: string;
  onPress: () => void;
}) => (
  <View className="mx-2">
   <RoundedCircleButton onPress={onPress} color='bg-silver/40' size={60}>
      <Icon name={iconName} size={20} color="#000" />
      <StylizedText type="label1" styleClass="text-black/70">
        {label}
      </StylizedText>
    </RoundedCircleButton>
  </View>
);

// InfoItem 컴포넌트
const InfoItem = ({
  iconName,
  value,
  label,
  isMaterialCommunityIcon = false,
}: {
  iconName: string;
  value: string | number;
  label: string;
  isMaterialCommunityIcon?: boolean;
}) => {
  const IconComponent = isMaterialCommunityIcon ? MCIcon : Icon;
  return (
    <View className="w-[48%] flex-row items-center bg-white/90 p-4 rounded-lg mb-3">
      <IconComponent name={iconName} size={22} color="#6B7280" />
      <View className="ml-3">
        <StylizedText type="body1" className="text-gray-900">
          {value} {label}
        </StylizedText>
      </View>
    </View>
  );
};

// ProgressBar 컴포넌트
const ProgressBar: React.FC<{
  current: number;
  goal: number;
  color?: string;
  labelColor?: string;
  unit?: string;
  iconName?: string;
}> = ({ current, goal, color = ColorMap['primary'],labelColor = 'text-gray-800', unit, iconName }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <View className="px-2.5 flex-row">
      <View className="flex-row">
        <View className="mr-2 mt-2">
          <Icon name={iconName} size={48} color={color} />
        </View>
        <View className="justify-center">
          <View className="flex-row justify-between mb-1 pr-10">
            <View className="flex-row items-end">
              <StylizedText styleClass={`${labelColor}`} type="header1">
                {current}
              </StylizedText>
              <StylizedText styleClass={`text-gray-700 mb-1.5 ml-2`} type="body2">
                {unit}
              </StylizedText>
            </View>
            <View className="flex-row items-end mb-1.5">
              <StylizedText styleClass={`${labelColor}`} type="label2">
                목표: {goal}
              </StylizedText>
            </View>
          </View>
          <HBarChart color={color} percentage={percentage} />
        </View>
      </View>
    </View>
  );
};

const ProfileWallPaper: React.FC = () => (
  <View className="w-full h-full absolute">
    <Shapes
      primaryColor={ColorMap["primary"] + OpacityMap["40"]}
      secondaryColor={ColorMap["primary"] + OpacityMap["25"]}
      height={4}
      borderRadius={30}
      figures={[
        { name: "circle", position: "center", size: 120 },
        { name: "diamondNarrow", position: "flex-end", axis: "top", size: 100 },
        { name: "donut", position: "center", axis: "left", size: 80 },
        { name: "triangle", position: "flex-start", axis: "bottom", size: 70 },
        { name: "cutDiamond", position: "center", axis: "bottom", size: 60 },
      ]}
    />
  </View>
);

const PetProfile: React.FC<{ route: RouteProp<RootStackParamList, "PetProfile"> }> = ({
  route,
}) => {
  const petId = route.params?.id || "";
  const navigation = useNavigation();
  const [petData, setPetData] = useState<PetDetails>();
  const [loading, setLoading] = useState(true);

  const fetchPetData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPetDetails(petId);
      setPetData(data || undefined);
    } catch (error) {
      Alert.alert("오류", "반려동물 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useFocusEffect(
    useCallback(() => {
      fetchPetData();
    }, [fetchPetData])
  );

  const handlePetDelete = async () => {
    if (!petData) return;
    const isDeleted = await deletePet(petData.id);
    if (isDeleted) navigation.navigate("MyPage");
    else Alert.alert("삭제 실패", "반려동물을 삭제하지 못했습니다.");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <StylizedText type="body1">데이터 로딩 중...</StylizedText>
      </View>
    );
  }

  if (!petData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <StylizedText type="body1">반려동물 데이터가 없습니다.</StylizedText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <BackArrowHeader />
      <ScrollView className="mb-12">
        <View className="w-full items-center justify-center">
          <ProfileWallPaper />
          <View className="h-24"/>
          <View className="flex-1 items-center justify-center">
            <View className="w-[135px] h-[135px] bg-white rounded-full absolute"/>
            <Avatar
              source={petData.imageUrl ? { uri: petData.imageUrl } : AvatarPlaceholder}
              size={120}
              shadow
            />
          </View>
          <StylizedText type="header1" styleClass="text-center mt-4">
            {petData.name}
          </StylizedText>
        </View>
        <View className="flex-row justify-center flex-wrap mt-4">
          <ActionButton
            iconName="paw-outline"
            label="보건정보"
            onPress={() => navigation.navigate("RegisterHealthInfo", { id: petId })}
          />
          <ActionButton
            iconName="create-outline"
            label="수정"
            onPress={() => navigation.navigate("PetUpdate", { id: petId, data: petData })}
          />
          <ActionButton iconName="trash-outline" label="삭제" onPress={handlePetDelete} />
        </View>
        <View className="mt-2 mb-2 p-6">
          <View className="flex-row flex-wrap justify-between">
            <InfoItem iconName="paw-outline" value={petData.petType} label="" />
            <InfoItem iconName="male-female-outline" value={petData.gender} label="" />
            <InfoItem iconName="fitness-outline" value={petData.weight} label="kg" />
            <InfoItem
              iconName="cake"
              value={petData.age}
              label="세"
              isMaterialCommunityIcon
            />
          </View>
        </View>
        <View className="px-6">
          <RoundedBox preset="FullBox" shadow={false}>
          <View className="w-full">
            <View className="flex-row my-2 px-4">
              <FA5Icon name='fire-alt' size={15} color={ColorMap['red']}/>
              <StylizedText type="label2" styleClass="text-danger ml-2">{mockData.estimatedCalories} kcal 소모</StylizedText>
            </View>
            <ProgressBar
              color={ColorMap["green"]}
              labelColor={'text-safe'}
              current={mockData.minutes.current}
              goal={mockData.minutes.goal}
              unit="분"
              iconName="stopwatch-outline"
            />
            <ProgressBar
              color={ColorMap["green"]}
              labelColor={'text-safe'}
              current={mockData.steps.current}
              goal={mockData.steps.goal}
              unit="걸음"
              iconName="footsteps-outline"
            />
          </View>
          </RoundedBox>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetProfile;
