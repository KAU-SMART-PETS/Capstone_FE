// WalkScreenStyle.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  greenBox: {
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(146, 186, 115, 0.85)",
    marginBottom: 20,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  greenBoxText: {
    color: "white",
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 30,
    marginLeft: 20,
  },
  walkButton: {
    backgroundColor: "#73A8BA",
    borderRadius: 10, // 테두리의 border radius 조정
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  walkButtonText: {
    color: "white",
    fontSize: 18,
  },
  recentWalksContainer: {
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
  recentWalksContainerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walkItem: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  walkItemText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#808080",
    marginRight: 10,
  },
  grayText: {
    color: "#808080",
  },
  blackText: {
    color: "#000",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  recentWalksTitle: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  showAllButtonContainer: {
    marginRight: 20,
  },

  //산책하기 버튼 -> 모달
  walkmodalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backButtonText: {
    marginTop: 60,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
  },

  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // 모달 제목 스타일
  walkmodalTitle: {
    fontSize: 23,
    marginBottom: 50,
    fontWeight: "bold",
  },
  // 반려동물 리스트 컨테이너 스타일
  petListContainer: {
    maxHeight: 200, // 반려동물 리스트가 너무 길어지면 스크롤 가능하도록
  },
  // 반려동물 아이템 스타일
  petItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  modalPetSelected: {
    backgroundColor: "#FCE4EC",
    borderColor: "#73A8BA",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },

  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  petName: {
    fontSize: 18,
  },

  modalButtonContainer: {
    marginTop: 20,
  },
  modalwalkButton: {
    backgroundColor: "#73A8BA",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginTop: 10,
    marginLeft: 20,
  },
  modalwalkButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
