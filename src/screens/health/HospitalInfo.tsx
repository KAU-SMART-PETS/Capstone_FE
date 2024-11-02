import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import KakaoMap from './kakaoMap';

const HospitalInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vetId } = route.params;
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const latitude = 35.2031699;
    const longitude = 126.8971756;
    console.log(vetId);

    const fetchHospitalInfo = async () => {
      try {
        const response = await axios.post(`${config.API_SERVER_URL}/api/v1/vets/${vetId}`, {
          latitude,
          longitude,
        });
        setHospital(response.data);
      } catch (error) {
        console.error('Error fetching hospital info:', error);
      }
    };

    fetchHospitalInfo();
  }, [vetId]);

  if (!hospital) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{hospital.name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Image source={require('@image/icon/phoneVector.png')} style={styles.icon} />
          <Text style={styles.info}>{hospital.telephone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={require('@image/icon/locationVector.png')} style={styles.icon} />
          <Text style={styles.info}>{hospital.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={require('@image/icon/locationVector.png')} style={styles.icon} /> 
          <Text style={styles.info}>{hospital.vetToMemberDistance} m</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <KakaoMap latitude={hospital.latitude} longitude={hospital.longitude} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    color: '#333333',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 5,
    borderBottomColor: '#F9F9F9',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  info: {
    color: 'black',
    fontSize: 20,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default HospitalInfo;