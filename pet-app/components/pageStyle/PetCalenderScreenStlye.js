// PetCalenderScreenStyle.js
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
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
  calendar: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // 왼쪽과 오른쪽 정렬
    alignItems: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  weeklyViewButton: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
  chartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  chartItem: {
    alignItems: "center",
    marginBottom: 20,
    width: (screenWidth - 80) / 3,
  },
  chartLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  chartValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default styles;
