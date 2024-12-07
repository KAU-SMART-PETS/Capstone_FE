import React from "react";
import { Alert } from 'react-native';
import PetForm from "./PetForm";
import { submitPetRegistration } from "@src/api/petApi";
import { useNavigation } from "@react-navigation/native";
import redirectIfNoSession from "@src/redirectionIfNoSession";

const PetRegister: React.FC = () => {
  const navigation = useNavigation();
  redirectIfNoSession();
  const handleSubmit = async (formData: any) => {
    try {
      await submitPetRegistration(formData, navigation);
      Alert.alert("성공", "반려동물이 등록되었습니다.");
    } catch (error) {
      Alert.alert("오류", "반려동물 등록에 실패했습니다.");
    }
  };
  return <PetForm title="반려동물 등록" onSubmit={handleSubmit} />;
};

export default PetRegister;
