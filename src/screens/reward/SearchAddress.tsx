import React, { Component } from 'react';
import Postcode from '@actbase/react-daum-postcode';
import { View } from 'react-native';

class SearchAddress extends Component {
    constructor(props) {
        super(props);
    }

    getAddressData = (data) => {
        let defaultAddress = '';

        if (data.buildingName === '') {
            defaultAddress = '';
        } else if (data.buildingName === 'N') {
            defaultAddress = `(${data.apartment})`;
        } else {
            defaultAddress = `(${data.buildingName})`;
        }

          // Navigate back to the previous page with params
          this.props.navigation.navigate({
            name: 'PaymentInformation', // 정확한 페이지 이름
            params: { 
                zonecode: data.zonecode,
                address: data.address,
                defaultAddress,
            },
            merge: true, // 기존 params에 병합
        });
    };

    render() {
        return (
            <View className="pt-8">
                <Postcode
                    style={{ width: '100%', height: '100%' }}
                    jsOptions={{ animation: true }}
                    onSelected={(data) => this.getAddressData(data)}
                />
            </View>
        );
    }
}

export default SearchAddress;
