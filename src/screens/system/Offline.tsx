import React, { useEffect } from 'react'; 
import { View, BackHandler } from 'react-native';
import StylizedText from '@common/StylizedText';
import { RoundedTextButton } from '@common/RoundedButton';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo'; // 네트워크 상태 확인을 위한 import

const Offline = ({ navigation }) => {
    // 뒤로가기 비활성화
    useEffect(() => {
        const onBackPress = () => true; // 뒤로가기 무시
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []);

    // RELOAD 버튼 핸들러
    const handleReload = async () => {
        const state = await NetInfo.fetch(); // 네트워크 상태 확인
        if (state.isConnected) {
            console.log('Network connected. Returning to the previous page.');
            navigation.goBack(); // 이전 페이지로 이동
        } else {
            console.log('Still offline.');
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* 상단 3/10 비우기 */}
            <View className="flex-[3]"></View>

            {/* 하단 7/10 컨텐츠 */}
            <View className="flex-[7] justify-start items-center mt-6">
                <StylizedText type="header2" styleClass="text-black text-center">
                    인터넷 연결 상태를 확인해 주세요.{"\n"}현재 오프라인입니다.
                </StylizedText>

                <MCIcon name="cloud-off-outline" size={80} color="#A3A3AC" className="mb-8" />
                <View className="mt-8"></View>
                <RoundedTextButton
                    color="bg-primary"
                    icon={<MCIcon name="reload" color="white" size={20} />}
                    textColor="text-white"
                    content="페이지 다시 불러오기"
                    color="bg-secondary"
                    widthOption="lg"
                    onPress={handleReload} // RELOAD 버튼 핸들러
                />
            </View>
        </View>
    );
};

export default Offline;
