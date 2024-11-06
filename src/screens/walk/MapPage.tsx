import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapPage: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 37.4219983,
    longitude: -122.084,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        console.log("위치 권한 부여:", granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          watchId = startWatchingLocation();
        }
      } else {
        watchId = startWatchingLocation();
      }
    };

    requestLocationPermission();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const startWatchingLocation = () => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("위치 추적:", latitude, longitude);

        setLocation({ latitude, longitude });

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      },
      (error) => console.log("위치 추적 오류:", error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      }
    );

    return watchId;
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        showsUserLocation
      >
        {location && (
          <Marker
            coordinate={location}
            title="내 위치"
            description="현재 위치입니다."
          />
        )}
      </MapView>
    </View>
  );
};

export default MapPage;
