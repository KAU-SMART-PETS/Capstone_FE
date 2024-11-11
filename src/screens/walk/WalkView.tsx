import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  Image,
} from "react-native";
import styles from "../pageStyle/WalkViewStyle";
import { useNavigation } from "@react-navigation/native";
import Dog1 from '@image/placeholder/dog.jpg';
import Dog2 from '@image/placeholder/dog.jpg';

const WalkView = () => {
  const [showAllWalks, setShowAllWalks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // 가상의 산책 데이터 10개 생성
  const recentWalks = [
    { id: 1, date: "2024.05.28", duration: "00:30:00", distance: "2.00km" },
    { id: 2, date: "2024.05.27", duration: "00:45:00", distance: "3.00km" },
    { id: 3, date: "2024.05.26", duration: "00:25:00", distance: "1.50km" },
    { id: 4, date: "2024.05.25", duration: "00:40:00", distance: "2.50km" },
    { id: 5, date: "2024.05.24", duration: "00:35:00", distance: "2.20km" },
    { id: 6, date: "2024.05.23", duration: "00:20:00", distance: "1.00km" },
    { id: 7, date: "2024.05.22", duration: "00:55:00", distance: "4.00km" },
    { id: 8, date: "2024.05.21", duration: "00:33:00", distance: "2.30km" },
    { id: 9, date: "2024.05.20", duration: "00:28:00", distance: "1.80km" },
    { id: 10, date: "2024.05.19", duration: "00:50:00", distance: "3.50km" },
  ];

  const visibleWalks = showAllWalks ? recentWalks : recentWalks.slice(0, 5);
  const navigation = useNavigation();
  const petList = [
    {
      id: 1,
      name: "인절미",
      image: Dog1,
    },
    {
      id: 2,
      name: "우유",
      image: Dog2,
    },
    // 나머지 반려동물 정보 추가
  ];
  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
  };

  const handleStartWalk = () => {
    // selectedPet 정보를 사용하여 산책 시작
    // 이후 모달 닫기 등 추가 작업 수행

    setShowModal(false);
    navigation.navigate("WalkTimer");
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBox}>
        <View style={styles.greenBoxContent}>
          <Text style={styles.greenBoxText}>
            오늘도 즐겁게 {"\n"}산책을 시작해볼까요?
          </Text>
        </View>
        <TouchableOpacity
          style={styles.walkButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.walkButtonText}>산책하기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.recentWalksContainer}>
        <View style={styles.recentWalksContainerTop}>
          <Text style={styles.recentWalksTitle}>최근 산책</Text>
          {!showAllWalks && (
            <View style={styles.showAllButtonContainer}>
              <Button
                title=">"
                onPress={() => setShowAllWalks(true)}
                color="#808080"
              />
            </View>
          )}
          {showAllWalks && (
            <TouchableOpacity
              onPress={() => setShowAllWalks(false)}
              style={styles.showAllButtonContainer}
            >
              <Text>요약보기</Text>
            </TouchableOpacity>
          )}
        </View>
        {visibleWalks.map((walk, index) => (
          <View key={walk.id}>
            <View style={styles.walkItem}>
              <View style={styles.dateContainer}>
                <Text style={[styles.walkItemText, styles.grayText]}>
                  산책 일시
                </Text>
                <Text style={[styles.walkItemText, styles.blackText]}>
                  {walk.date}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={[styles.walkItemText, styles.grayText]}>
                  산책 시간
                </Text>
                <Text style={[styles.walkItemText, styles.blackText]}>
                  {walk.duration}
                </Text>
              </View>
              <View style={styles.distanceContainer}>
                <Text style={[styles.walkItemText, styles.grayText]}>
                  이동 거리
                </Text>
                <Text style={[styles.walkItemText, styles.blackText]}>
                  {walk.distance}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.walkmodalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.walkmodalTitle}>누구랑 산책을 해볼까요?</Text>
          <ScrollView style={styles.petListContainer}>
            {petList.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={[
                  styles.petItem,
                  selectedPet &&
                    selectedPet.id === pet.id &&
                    styles.modalPetSelected,
                ]}
                onPress={() => handleSelectPet(pet)}
              >
                <Image source={pet.image} style={styles.petImage} />
                <Text style={styles.petName}>{pet.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              title="시작하기"
              style={styles.modalwalkButton}
              onPress={handleStartWalk}
            >
              <Text style={styles.modalwalkButtonText}>시작</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WalkView;