import React, { useState } from "react";
import { View, ScrollView, SafeAreaView, Alert, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { RoundedTextButton } from "@src/components/common/RoundedButton";
import CustomTextInput from "@src/components/common/CustomTextInput";
import StylizedText from "@src/components/common/StylizedText";
import Avatar from "@src/components/common/Avatar";
import HeaderBar from "@src/components/HeaderBar";
import RadioButton from "@common/RadioButton";
import emptyCircleFrame from "@image/frame/addPetCircle.png";
import { dogData, catData } from "@src/utils/constants/species";

interface PetFormProps {
  initialData?: {
    name: string;
    petType: string;
    gender: string;
    // breed: string;
    weight: number;
    age: number;
    imageUrl: string | null;
  };
  onSubmit: (formData: {
    name: string;
    petType: number;
    gender: number;
    breed: string;
    weight: number;
    age: number;
    image: string | null;
  }) => void;
  title: string;
}

const PetForm: React.FC<PetFormProps> = ({ initialData, onSubmit, title }) => {
  const [petType, setPetType] = useState(initialData?.petType|| "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [petImage, setPetImage] = useState(initialData?.imageUrl ? { uri: initialData.imageUrl } : null);
  const [name, setName] = useState(initialData?.name || "");
  // NOTE : breed를 UI에서 picker로 받아오는 부분은 되어있으나, API처리 부분이 안되어 있음.
  const [breed, setBreed] = useState(""); 
  const [weight, setWeight] = useState(initialData?.weight ? String(initialData?.weight) : "");
  const [age, setAge] = useState(initialData?.age ? String(initialData?.age) : "");

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
      if (response.assets?.[0]?.uri) {
        setPetImage({ uri: response.assets[0].uri });
      }
    });
  };

  const validateAndSubmit = () => {
    if (!name.trim()) return Alert.alert("오류", "이름을 입력하세요.");
    if (!petType) return Alert.alert("오류", "반려동물 종류를 선택하세요.");
    if (!gender) return Alert.alert("오류", "성별을 선택하세요.");
    if (!weight || isNaN(Number(weight))) return Alert.alert("오류", "유효한 체중을 입력하세요.");
    if (!age || isNaN(Number(age))) return Alert.alert("오류", "유효한 나이를 입력하세요.");

    onSubmit({
      name: name.trim(),
      petType: petType === "DOG" ? 2 : 1,
      gender: gender === "FEMALE" ? 2 : 1,
      breed,
      weight: parseFloat(weight),
      age: parseInt(age, 10),
      image: petImage?.uri || null,
    });
  };

  const renderRadioSelectors = (
    label: string,
    options: { label: string; value: string }[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <View className="flex-1 w-full px-4 mb-2.5">
      <View className="flex-row justify-between items-center">
        <StylizedText type="header2">{label}</StylizedText>
        <View className="flex-row w-1/2 justify-between">
          {options.map(({ label, value }) => (
            <RadioButton
              key={value}
              label={label}
              variant="text"
              isSelected={selectedValue === value}
              onPress={() => onSelect(value)}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderBar showBackButton title={title} />
      <ScrollView className="w-full px-4">
        {/* 이미지 업로드 */}
        <View className="items-center my-2">
          <TouchableOpacity onPress={handleImagePick} className="mb-4">
            <Avatar source={petImage || emptyCircleFrame} size={120} />
          </TouchableOpacity>
          <StylizedText type="label-title" styleClass="text-gray-500">눌러서 사진 변경</StylizedText>
        </View>
        <View className="flex-1 w-full h-1 bg-gray-100 my-4" />
        <View className="px-3 my-2">
            {/* 라디오 버튼 그룹 */}
            {renderRadioSelectors("반려동물 종류", [
            { label: "강아지", value: "DOG" },
            { label: "고양이", value: "CAT" },
            ], petType, setPetType)}

            {renderRadioSelectors("성별", [
            { label: "암", value: "FEMALE" },
            { label: "수", value: "MALE" },
            ], gender, setGender)}
        </View>
        {/* 입력 필드 */}
        <View className="items-center">
          <CustomTextInput label="이름" placeholder="이름을 입력하세요" value={name} onChangeText={setName} />
          <CustomTextInput
            label="견종 / 묘종"
            placeholder={petType !== "" ? "견종/묘종을 선택하세요" : "[필수] 반려동물 종류를 먼저 선택해 주세요"}
            value={breed}
            onChangeText={setBreed}
            type={petType !== "" ? "picker" : "readOnly"}
            pickerItems={petType === "DOG" ? dogData : petType === "CAT" ? catData : []}
          />
          <CustomTextInput label="체중(kg)" placeholder="체중을 입력하세요" value={weight} onChangeText={setWeight} keyboardType="numeric" />
          <CustomTextInput label="나이" placeholder="나이를 입력하세요" value={age} onChangeText={setAge} keyboardType="numeric" />
        </View>
      </ScrollView>
      {/* 저장 버튼 */}
      <View className="px-7 py-4 mb-2">
        <RoundedTextButton content="저장하기" widthOption="full" color="bg-primary" onPress={validateAndSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default PetForm;
