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
        const returnTo = this.props.route.params?.returnTo || 'DefaultPage';

       /*
       //setParams & goBack을 사용할 때 페이지에서 params값을 받아오지 못하는 이슈 발생하여 미사용 코드.
        this.props.navigation.setParams({
            zonecode: data.zonecode,
            address: data.address,
            defaultAddress,
        });
        console.log('setParams called with:', {
            zonecode: data.zonecode,
            address: data.address,
            defaultAddress,
        });
        this.props.navigation.goBack();
        */
   
        console.log('Navigating back to:', returnTo);
        console.log('Passing params:', {
        zonecode: data.zonecode,
        address: data.address,
        defaultAddress,
        });

        this.props.navigation.navigate(returnTo, {
            zonecode: data.zonecode,
            address: data.address,
            defaultAddress,
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
