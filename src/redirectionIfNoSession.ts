import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';

const redirectIfNoSession = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionId = await AsyncStorage.getItem('JSESSIONID');
                if (!sessionId) {
                    Alert.alert(
                        '로그인이 필요합니다',
                        '로그인 페이지로 이동합니다.',
                        [
                            {
                                text: '확인',
                                onPress: () => {
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{ name: 'Login' }],
                                        })
                                    );
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }
            } catch (error) {
                console.error('Error checking session:', error);
            }
        };

        checkSession();
    }, [navigation]);
};

export default redirectIfNoSession;
