// HomeScreen.js

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("ProfileEdit")}
      >
        <Text>내 정보 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("PetRegistration")}
      >
        <Text>펫 등록</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("산책하기")}
      >
        <Text>산책하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("바둑이의 하루")}
      >
        <Text>바둑이의 캘린더</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
