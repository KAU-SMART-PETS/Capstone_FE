import React from 'react';
import { Button, Text, PaperProvider, Portal } from 'react-native-paper';
import RoundedFrame from '@common/RoundedBox'; // Adjust the path to your component
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Pressable, Dimensions } from 'react-native';

interface ModalProps {
  visible: boolean;
  hideModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, hideModal }) => {
  const screenHeight = Dimensions.get('window').height; // Get screen height
  const offset = 200;  // Set an offset value for how far down the modal should start

  // Shared values for animation: opacity and translateY
  const translateY = useSharedValue(screenHeight + offset);  // Start further down, below center
  const opacity = useSharedValue(0);  // Start fully transparent

  React.useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 }); // Move to center
      opacity.value = withTiming(1, { duration: 300 }); // Fade in
    } else {
      translateY.value = withTiming(screenHeight + offset, { duration: 300 });  // Move back down
      opacity.value = withTiming(0, { duration: 300 });  // Fade out
    }
  }, [visible, translateY, opacity, screenHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
    //   transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  if (!visible) return null; // Do not render the modal if not visible

  return (
    <View className="absolute inset-0 z-10 w-full h-full flex-1">
      <Pressable 
        onPress={hideModal} 
        className="flex-1 w-full h-full absolute inset-0 bg-black/50 justify-center items-center"
      >
        <Animated.View
          style={animatedStyle}
          className="w-80 p-5 bg-white rounded-xl"
        >
          <RoundedFrame>
            <Text className="text-lg">Example Modal with Animation</Text>
            <Button onPress={hideModal} className="mt-4">
              Close
            </Button>
          </RoundedFrame>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const ModalExample: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
        <Portal>
          {/* Pass the visible state and hideModal function to the Modal */}
          <Modal visible={visible} hideModal={hideModal} />
        </Portal>
        <Button onPress={showModal} className="mt-10">
          Show Modal
        </Button>
    </PaperProvider>
  );
};

export default ModalExample;
