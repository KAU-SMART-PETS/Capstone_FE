import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "200",
    marginVertical: 20,
    textAlign: "center",
    paddingBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  walkStatusText: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  walkComplete: {
    color: "green",
  },
  walkIncomplete: {
    color: "red",
  },

  chartItem: {
    alignItems: "center",
    marginBottom: 20,
    width: (screenWidth - 60) / 3, // Adjusted width to accommodate 3 items with margins
  },
  chartLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  chartValue: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default styles;
