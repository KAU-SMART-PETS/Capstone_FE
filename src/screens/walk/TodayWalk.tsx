import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import RNLocation from 'react-native-location'; // Use react-native-location
import Toast from "react-native-toast-message";
import { WeeklySummaryProps } from '@types';

const TodayWalk: React.FC<WeeklySummaryProps> = ({ petId = 1 }) => {
  const [location, setLocation] = useState<any>(null);
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Location fetching function
  // const getLocation = async () => {
  //   try {
  //     // Request permission to access location
  //     const granted = await RNLocation.requestPermission({
  //       ios: "whenInUse", // For iOS
  //       android: {
  //         detail: "fine", // or "coarse"
  //       },
  //     });

  //     if (granted) {
  //       // Fetch the latest location
  //       const location = await RNLocation.getLatestLocation({
  //         timeout: 10000, // 10 seconds timeout
  //       });

  //       setLocation(location);
  //       setInitialRegion({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //         latitudeDelta: 0.005,
  //         longitudeDelta: 0.005,
  //       });
  //     } else {
  //       setErrorMessage("Location permission denied");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching location:", error);
  //     setErrorMessage("An error occurred while fetching location.");
  //   }
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  const endWalk = () => {
    Toast.show({
      type: "success",
      text1: "오늘도 함께 산책해줘서 고마워요!",
      autoHide: true,
      position: "top",
    });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        {/* <MapView className="absolute inset-0" initialRegion={initialRegion}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"Current Location"}
              description={"I am here"}
            />
          )}
        </MapView> */}
      </View>
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-2xl font-bold">오늘의 산책 기록</Text>
          <Image source={{ uri: "https://via.placeholder.com/150" }} className="w-12 h-12 rounded-full" />
        </View>

        {errorMessage && (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        )}

        <TouchableOpacity 
          className="bg-[#73A8BA] p-4 rounded-lg items-center mt-5"
          onPress={endWalk}>
          <Text className="text-white text-lg font-bold">산책 종료</Text>
        </TouchableOpacity>
      </View>

      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
};

export default TodayWalk;
