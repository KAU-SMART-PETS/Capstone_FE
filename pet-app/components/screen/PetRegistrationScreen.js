import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Button } from "react-native";
import { Text } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import CustomTextInput from "../CustomTextInput";
import ImagePickerComponent from "../ImagePickerComponent";
import { Slider } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  pagetitle,
  memberForm,
  separator,
  saveButton,
  saveButtonStyles,
  saveButtonText,
  checkBoxForm,
  weightSlider,
  dateForm,
  dateText,
  dateButton,
} from "../pageStyle/PetRegistrationStlye";

const PetRegistrationScreen = () => {
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    gender: "",
    breed: "",
    weight: "",
    registrationNumber: "",
    healthInfo: "",
    birthDate: "",
  });

  const [dogChecked, setDogChecked] = useState(false);
  const [catChecked, setCatChecked] = useState(false);
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [weight, setWeight] = useState(0);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (key, value) => {
    setPetData({ ...petData, [key]: value });
  };

  const handleDogCheck = () => {
    setDogChecked(true);
    setCatChecked(false);
    setPetData({ ...petData, type: "강아지" });
  };

  const handleCatCheck = () => {
    setDogChecked(false);
    setCatChecked(true);
    setPetData({ ...petData, type: "고양이" });
  };

  const handleMaleCheck = () => {
    setMaleChecked(true);
    setFemaleChecked(false);
    setPetData({ ...petData, gender: "남아" });
  };

  const handleFemaleCheck = () => {
    setMaleChecked(false);
    setFemaleChecked(true);
    setPetData({ ...petData, gender: "여아" });
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const saveChanges = () => {
    console.log("등록된 반려동물 데이터:", petData);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 0 }}>
      <View style={{ flex: 1, padding: 15 }}>
        <View
          style={{
            flex: 1,
            padding: 5,
            alignItems: "center",
          }}
        >
          <Text style={pagetitle}>반려동물 등록하기</Text>
        </View>

        <ImagePickerComponent />

        <View style={checkBoxForm}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckBox
              title="강아지"
              checked={dogChecked}
              onPress={handleDogCheck}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              checkedColor="#73a8ba"
              uncheckedColor="#808080"
            />
            <CheckBox
              title="고양이"
              checked={catChecked}
              onPress={handleCatCheck}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              checkedColor="#73a8ba" // Color when checkbox is checked
              uncheckedColor="#808080" // Color when checkbox is not checked
            />
          </View>
        </View>

        <View style={memberForm}>
          <CustomTextInput
            placeholder="이름"
            value={petData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <View style={checkBoxForm}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckBox
                title="남아"
                checked={maleChecked}
                onPress={handleMaleCheck}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
                checkedColor="blue"
                uncheckedColor="#808080"
              />
              <CheckBox
                title="여아"
                checked={femaleChecked}
                onPress={handleFemaleCheck}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
                checkedColor="pink" // Color when checkbox is checked
                uncheckedColor="#808080" // Color when checkbox is not checked
              />
            </View>
          </View>
          <View>
            <Text>체중 {weight.toFixed(1)} kg</Text>
            <Slider
              style={weightSlider}
              minimumValue={0}
              maximumValue={50}
              step={0.1}
              value={weight}
              onValueChange={handleWeightChange}
              minimumTrackTintColor="#73a8ba"
              maximumTrackTintColor="#808080"
              thumbTintColor="#73a8ba"
              thumbStyle={{ width: 30, height: 30 }}
            />
          </View>

          <CustomTextInput
            placeholder="등록번호"
            value={petData.registrationNumber}
            onChangeText={(text) =>
              handleInputChange("registrationNumber", text)
            }
          />
          <CustomTextInput
            placeholder="보건정보"
            value={petData.healthInfo}
            onChangeText={(text) => handleInputChange("healthInfo", text)}
          />

          <View style={dateForm}>
            <Button
              title={showDatePicker ? "취소" : "생년월일 선택"}
              titleStyle={{ color: "#808080" }}
              onPress={() => setShowDatePicker(!showDatePicker)}
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={birthDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
            {birthDate && !showDatePicker && (
              <Text style={dateText}>{birthDate.toLocaleDateString()}</Text>
            )}
          </View>
        </View>

        <View style={saveButton}>
          <TouchableOpacity style={saveButtonStyles} onPress={saveChanges}>
            <Text style={saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PetRegistrationScreen;
