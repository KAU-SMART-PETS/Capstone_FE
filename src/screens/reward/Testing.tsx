import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Testing = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [postalCode, setPostalCode] = useState('');
  const [fullAddress, setFullAddress] = useState('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Params received in Testing page (on focus):', route.params);

      if (route.params) {
        const { zonecode, address, defaultAddress } = route.params;

        if (zonecode) setPostalCode(zonecode);
        if (address || defaultAddress) {
          setFullAddress(`${address || ''} ${defaultAddress || ''}`.trim());
        }
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleNavigateToSearchAddress = () => {
    navigation.navigate('SearchAddress', { returnTo: 'Testing' });
};

  return (
    <View>
      <Text>우편 번호: {postalCode}</Text>
      <Text>주소: {fullAddress}</Text>
      <Button 
        title="주소 검색" 
        onPress={handleNavigateToSearchAddress} 
      />
    </View>
  );
};

export default Testing;
