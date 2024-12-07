import React from "react";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { updatePetRegistration } from "@src/api/petApi";
import PetForm from "./PetForm";
import redirectIfNoSession from "@src/redirectionIfNoSession";

type PetUpdateScreenRouteProp = RouteProp<RootStackParamList, 'PetUpdate'>;

const PetUpdate: React.FC<{ route: PetUpdateScreenRouteProp }> = ({ route }) => {
  const { id, data } = route.params!;
  const navigation = useNavigation();
  redirectIfNoSession();
  const handleSubmit = async (formData: any) => {
    await updatePetRegistration(formData, id, navigation);
  };
  if (!data) return null; // 로딩 상태 처리

  return <PetForm title="반려동물 수정" initialData={data} onSubmit={handleSubmit} />;
};

export default PetUpdate;
