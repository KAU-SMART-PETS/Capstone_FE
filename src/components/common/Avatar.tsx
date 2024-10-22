import React from 'react';
import { View, Image } from 'react-native';
import AvatarPlaceholder from '@image/placeholder/dog.jpg'; // 기본 이미지

// 사용법 : <Avatar source={dog1} size={250}/>

// Avatar 컴포넌트에 props를 받아 커스터마이징 가능하게 수정
const Avatar = ({ size = 80, source = AvatarPlaceholder, className = '' }) => {
    return (
        <View
            className={`rounded-full overflow-hidden z-0 ${className}`}
            style={{ width: size, height: size }}
        >
            <Image
                source={source}
                className={`w-full h-full`}
                style={{ width: size, height: size }}
            />
        </View>
    );
}

export default Avatar;
