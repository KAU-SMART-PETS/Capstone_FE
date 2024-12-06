import React, { useState } from 'react';
import { View } from 'react-native';
import dog1 from '@image/placeholder/dog.jpg';
import { RoundedTextButton, RoundedSquareButton, RoundedCircleButton } from '@common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import ListCard from '@common/ListCard';
import StylizedText from '@common/StylizedText';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// MyPage PetCard
interface Device {
  id: string;
  name: string;
}
interface PetCardProps {
  name: string;
  details: string;
  avatarPath?: string | null;
  devices: Device[];
  selectedDeviceId: string;
  onSelectDevice: (deviceId: string) => void;
  onPress?: ()=> void;
}

export const PetCard: React.FC<PetCardProps> = ({
  name,
  details,
  avatarPath,
  devices,
  selectedDeviceId,
  onSelectDevice,
  onPress,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleButtonPress = (action: () => void, setVisible: (visible: boolean) => void) => {
    return () => {
      action();
      setVisible(false);
    };
  };
  const selectedDevice = devices.find(device => device.id === selectedDeviceId);
  const imageSrc = avatarPath
    ? { uri: avatarPath }
    : dog1;
    const CancelButton = (
      <RoundedTextButton
        content="취소"
        color="bg-secondary"
        widthOption="lg"
        onPress={handleButtonPress(() => console.log('취소'), setIsModalVisible)}
      />
    );
  
    const modalRows = [
      {
        content: devices.map(device => (
          <RoundedTextButton
            key={device.id}
            content={device.name}
            widthOption="lg"
            onPress={() => {
              onSelectDevice(device.id);
              setIsModalVisible(false);
            }}
          />
        )),
        layout: 'column',
      },
      {
        content: [CancelButton],
        layout: 'column',
      },
    ];
  return (
    <ListCard
    preset='flatcard2'
    outline='inactive-solid'
    shadow={false}
    avatar={ imageSrc }
      title={
        <View className="flex-row items-start">
          <View className="flex-col mr-3">
            <StylizedText type="header6" styleClass="text-black mb-1">
              {name}
            </StylizedText>
            <StylizedText type="label" styleClass="text-black">
              {details}
            </StylizedText>
          </View>
          <RoundedCircleButton
            size={40}
            onPress={() => setIsModalVisible(true)}
            color={`border-2 ${selectedDevice ? 'bg-skyblue border-primary' : 'bg-lightgrey border-silver'}`}
          >
            <MCIcon name='devices' color="black" size={14} />
            <StylizedText type="label4" styleClass="text-black">
              {selectedDevice ? selectedDevice.name : '기기 선택'}
            </StylizedText>
          </RoundedCircleButton>
        </View>
      }
      onPress={onPress}
      content={
        <View>
          <ModalLayout
            visible={isModalVisible}
            setVisible={setIsModalVisible}
            title="디바이스 선택"
            titleAlign="center"
            rows={modalRows}
            position="center"
            transparent={false}
          />
        </View>
      }
    />
  ); 
}
