import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchUserProfile, updateUserProfile } from "@src/api/userApi";
import { UserData } from "@src/utils/constants/types";
import CustomTextInput from "@src/components/common/CustomTextInput";
import StylizedText from "@src/components/common/StylizedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoundedTextButton } from "@src/components/common/RoundedButton";
import HeaderBar from "@src/components/HeaderBar";

type EditableField = keyof UserData | "consent" | null;

const EditProfile: React.FC = () => {
  const [editingField, setEditingField] = useState<EditableField>(null);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserProfile();
      if (userData) setUserInfo(userData);
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    if (!userInfo) return;
    const success = await updateUserProfile(userInfo);
    if (success) {
      setEditingField(null);
      Alert.alert("알림", "정보가 성공적으로 업데이트되었습니다.");
    }
  };

  const handleChange = (key: keyof UserData, value: string | boolean) => {
    setUserInfo((prevInfo) => prevInfo && { ...prevInfo, [key]: value });
    setEditingField(key);
  };

  const renderInput = (
    label: string,
    key: keyof UserData,
    keyboardType: "default" | "email-address" | "phone-pad" = "default"
  ) => (
    <CustomTextInput
      label={label}
      placeholder={label}
      value={userInfo?.[key]?.toString() || ""}
      onChangeText={(text) => handleChange(key, text)}
      keyboardType={keyboardType}
      isEditableInitially={editingField === key}
      type={["email", "phoneNumber"].includes(key) ? "editableWithButton" : "readOnly"}
    />
  );

  const renderConsentButtons = (type: "smsOptIn" | "emailOptIn") => {
    const isOptedIn = userInfo?.[type];
    return (
      <View className="flex-row">
        {["동의", "비동의"].map((label, idx) => {
          const selected = idx === 0 ? isOptedIn : !isOptedIn;
          return (
            <RoundedTextButton
              key={label}
              color={selected ? "bg-primary" : "bg-skyblue"}
              extraStyleClass="px-1 py-1.5"
              textColor="text-white"
              content={label}
              shadow={false}
              widthOption="xs"
              onPress={() => handleChange(type, idx === 0)}
            />
          );
        })}
      </View>
    );
  };

  if (!userInfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pb-4">
      <HeaderBar showBackButton title="내 기본 정보" />
      <ScrollView className="flex-1 w-full p-4">
        <View className="items-center mt-4">
          {renderInput("이름", "name")}
          {renderInput("이메일", "email", "email-address")}
          {renderInput("소셜 사이트", "socialSite")}
          {renderInput("휴대폰 번호", "phoneNumber", "phone-pad")}
          {renderInput("포인트", "point")}
        </View>
        <View className="p-6">
          <StylizedText type="header2" styleClass="mb-3">광고성 정보 수신</StylizedText>
          {["smsOptIn", "emailOptIn"].map((type) => (
            <View
              key={type}
              className="flex-row justify-between items-center mb-1"
            >
              <StylizedText type="body1">
                {type === "smsOptIn" ? "SMS 수신" : "이메일 수신"}
              </StylizedText>
              {renderConsentButtons(type as "smsOptIn" | "emailOptIn")}
            </View>
          ))}
        </View>
      </ScrollView>
      {editingField && (
        <View className="pt-10 items-center p-6">
          <RoundedTextButton
            color="bg-primary"
            content="저장하기"
            widthOption="full"
            onPress={handleSave}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;
