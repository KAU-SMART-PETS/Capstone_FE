import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Pressable, Text, Image, View } from "react-native";

const ImagePickerComponent = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      setImageUrl(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <View>
      <Pressable onPress={uploadImage}>
        <Text>반려동물 사진 업로드</Text>
      </Pressable>
      {imageUrl !== "" && (
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default ImagePickerComponent;
