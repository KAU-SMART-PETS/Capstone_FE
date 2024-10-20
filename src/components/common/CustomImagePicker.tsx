import React, { useState } from "react";
import { Button, Image, View, Text } from "react-native";
import { launchImageLibrary, ImageLibraryOptions, Asset } from "react-native-image-picker";

const CustomImagePicker: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const pickedImage: Asset = response.assets[0];
        setImageUri(pickedImage.uri || null);
      }
    });
  };

  return (
    <View className="flex items-center justify-center mt-4">
      <Pressable 
        className="bg-blue-500 p-4 rounded-lg"
        onPress={pickImage}
      >
        <Text className="text-white">반려동물 사진 업로드</Text>
      </Pressable>
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="mt-4 w-[200px] h-[200px] rounded-lg" />
      ) : (
        <Text className="text-gray-500">이미지를 선택해주세요.</Text>
      )}
    </View>
  );
};

export default CustomImagePicker;
