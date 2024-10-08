// PetCalendarScreenStyle.js
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center",
    color: "#333",
  },
  weeklyChartContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  weeklyChartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  weeklyBarContainer: {
    flexDirection: "row", // 가로로 배치
    justifyContent: "space-around",
    width: "100%",
  },
  barItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  barDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
});

export default styles;
