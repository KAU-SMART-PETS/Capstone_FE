import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import StylizedText from "@common/StylizedText";

interface HeaderBarProps {
  title?: string;
  showBackButton?: boolean; // 뒤로가기 버튼 옵션
  position?: "absolute" | "relative"; // 위치 옵션
  iconButtons?: Array<{ icon: React.ReactNode; onPress: () => void }>; // 아이콘 버튼 목록
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title = '',
  showBackButton = false,
  position = "relative",
  iconButtons = [],
}) => {
  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.goBack();
  };
  return (
    <View
      className={`${position === "absolute" ? "absolute" : "relative"} 
        w-full flex-row items-center justify-between
        p-5 bg-white
        z-10
      `}
    >
      {/* 왼쪽 영역: 뒤로가기 버튼 및 제목 */}
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={handleBackButton} style={{ marginRight: 8 }}>
            <Ionicons size={22} name="chevron-back-outline" />
          </TouchableOpacity>
        )}
        <StylizedText type='header5'>{title}</StylizedText>
      </View>

      {/* 오른쪽 영역: 아이콘 버튼들 */}
      <View className="flex-row items-center">
        {iconButtons.map((button, index) => (
          <TouchableOpacity key={index} onPress={button.onPress} className='px-3 py-1 rounded-full'>
            {button.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HeaderBar;
