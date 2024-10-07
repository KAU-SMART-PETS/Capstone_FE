import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  checkBoxTitle,
  checkBoxSub,
  adCheckbox,
  pageSubtitle,
  checkBoxView,
  inputStyles,
  pagetitle,
  saveButtonStyles,
  saveButtonText,
  separator,
  memberForm,
  saveButton,
  checkBoxTest,
  checkBoxText,
  checkBoxtwo,
} from "../pageStyle/EditProfileStyle"; // styles 파일에서 스타일 불러오기

const EditProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    name: "김똑똑",
    email: "smartpets@example.com",
    id: "kimddokddok",
    newPassword: "",
    confirmPassword: "",
    phoneNumber: "010-0000-0000",
    emailConsent: false,
  });

  const [editedProfileData, setEditedProfileData] = useState({
    ...profileData,
  });

  const toggleConsent = (key) => {
    setEditedProfileData({
      ...editedProfileData,
      [key]: !editedProfileData[key],
    });
  };

  const toggleEmailConsent = () => {
    setEditedProfileData({
      ...editedProfileData,
      emailConsent: !editedProfileData.emailConsent,
    });
  };

  const toggleSmsConsent = () => {
    setEditedProfileData({
      ...editedProfileData,
      smsConsent: !editedProfileData.smsConsent,
    });
  };

  const saveChanges = () => {
    console.log("수정된 데이터:", editedProfileData);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            padding: 5,
            alignItems: "center",
          }}
        >
          <Text style={pagetitle}>내 정보 관리</Text>
        </View>
        <Text style={pageSubtitle}>회원 기본 정보</Text>

        <View style={memberForm}>
          <TextInput
            style={inputStyles}
            placeholder="이름"
            value={editedProfileData.name}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, name: text })
            }
          />
          <TextInput
            style={inputStyles}
            placeholder="이메일"
            value={editedProfileData.email}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, email: text })
            }
          />
          <TextInput
            style={inputStyles}
            placeholder="아이디"
            value={editedProfileData.id}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, id: text })
            }
          />
          <TextInput
            style={inputStyles}
            placeholder="새 비밀번호"
            value={editedProfileData.newPassword}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, newPassword: text })
            }
            secureTextEntry // 비밀번호 입력을 안전하게 하기 위해 secureTextEntry 사용
          />
          <TextInput
            style={inputStyles}
            placeholder="비밀번호 재입력"
            value={editedProfileData.confirmPassword}
            onChangeText={(text) =>
              setEditedProfileData({
                ...editedProfileData,
                confirmPassword: text,
              })
            }
            secureTextEntry // 비밀번호 입력을 안전하게 하기 위해 secureTextEntry 사용
          />
          <TextInput
            style={inputStyles}
            placeholder="휴대폰 번호"
            value={editedProfileData.phoneNumber}
            onChangeText={(text) =>
              setEditedProfileData({ ...editedProfileData, phoneNumber: text })
            }
          />
        </View>

        <View style={separator} />

        <Text style={checkBoxTitle}>광고성 수신 동의</Text>
        <Text style={checkBoxSub}>다양한 정보를 빠르게 만나볼 수 있어요</Text>

        <View style={[checkBoxTest, { justifyContent: "space-between" }]}>
          <View>
            <Text style={checkBoxText}>SMS 수신</Text>
          </View>
          <View style={checkBoxtwo}>
            <BouncyCheckbox
              style={adCheckbox}
              size={15}
              fillColor="#73A8BA"
              unfillColor="#FFFFFF"
              text="동의"
              iconStyle={{ borderColor: "red" }}
              textStyle={{
                fontFamily: "JosefinSans-Regular",
                textDecorationLine: "none",
              }}
              isChecked={editedProfileData.smsConsent}
              onPress={toggleSmsConsent}
            />
            <BouncyCheckbox
              style={adCheckbox}
              size={15}
              fillColor="#73A8BA"
              unfillColor="#FFFFFF"
              text="비동의"
              iconStyle={{ borderColor: "red" }}
              textStyle={{
                textDecorationLine: "none",
              }}
              isChecked={!editedProfileData.smsConsent}
              onPress={toggleSmsConsent}
            />
          </View>
        </View>

        {/* 이메일 수신 동의, 비동의 */}
        <View style={[checkBoxTest, { justifyContent: "space-between" }]}>
          <View>
            <Text style={checkBoxText}>이메일 수신</Text>
          </View>
          <View style={checkBoxtwo}>
            <BouncyCheckbox
              style={adCheckbox}
              size={15}
              fillColor="#73A8BA"
              unfillColor="#FFFFFF"
              text="동의"
              iconStyle={{ borderColor: "red" }}
              textStyle={{
                fontFamily: "JosefinSans-Regular",
                textDecorationLine: "none",
              }}
              isChecked={editedProfileData.emailConsent}
              onPress={toggleEmailConsent}
            />
            <BouncyCheckbox
              style={adCheckbox}
              size={15}
              fillColor="#73A8BA"
              unfillColor="#FFFFFF"
              text="비동의"
              iconStyle={{ borderColor: "red" }}
              textStyle={{
                textDecorationLine: "none",
              }}
              isChecked={!editedProfileData.emailConsent}
              onPress={toggleEmailConsent}
            />
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

export default EditProfileScreen;
