import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapstartButton: {
    backgroundColor: "#73A8BA",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  mapPauseButton: {
    backgroundColor: "#73A8BA",
    marginRight: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  mapPlayButton: {
    backgroundColor: "#73A8BA",
    marginRight: 40,
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 30,
  },
  mapStopButton: {
    backgroundColor: "#73A8BA",
    marginLeft: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  mapPausebuttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  mapStopbuttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  askWalkQuitmodalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  askWalkQuitmodalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  askWalkQuitmodalText: {
    marginTop: 30,
    marginBottom: 40,
    textAlign: "center",
    fontSize: 18,
  },
  askWalkQuitmodalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  askWalkQuitmodalStopButton: {
    backgroundColor: "#73A8BA",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  askWalkQuitmodalDeleteButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  askWalkQuitmodalStopText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  askWalkQuitmodalDeleteText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  recordContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  petPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailPart: {
    flexDirection: "row",
    marginBottom: 30,
  },
  detailLeft: {
    flex: 0.5,
  },
  detailRight: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  endWalkButton: {
    backgroundColor: "#73A8BA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
