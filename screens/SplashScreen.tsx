import * as React from "react";
import {
  Animated,
  Button,
  Dimensions,
  Text,
  View,
} from "react-native";
import { SystemBars } from "react-native-bars";
// import { requestNotifications } from "react-native-permissions";
import * as BootSplash from "react-native-smooth-bootsplash";
import { useNavigation } from "@react-navigation/native";  // Import the navigation hook

function SplashScreen() {
  const bootSplashLogo = require("../assets/bootsplash_logo.png");
  const navigation = useNavigation();  // Initialize navigation

  const [bootSplashIsVisible, setBootSplashIsVisible] = React.useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] =
    React.useState(false);

  // Animated values
  const opacity = React.useRef(new Animated.Value(1)).current;
  const translateY = React.useRef(new Animated.Value(50)).current;
  const scale = React.useRef(new Animated.Value(0)).current; // for scale effect
  const rotate = React.useRef(new Animated.Value(0)).current; // for rotation effect
  const backgroundColor = React.useRef(new Animated.Value(0)).current; // for background color

  // Interpolation for rotation and background color
  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColorInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#73ABBA'], 
  });

  const init = async () => {
    try {
      await BootSplash.hide();
      // Start the scaling, bouncing, and rotation animations
      Animated.parallel([
        Animated.spring(scale, {
          useNativeDriver: true,
          toValue: 1, // pop-in effect
          friction: 4,
          tension: 30,
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: 0, // bouncing to final position
          friction: 6,
        }),
        Animated.timing(rotate, {
          useNativeDriver: true,
          toValue: 1, // full rotation
          duration: 1500,
        }),
        Animated.timing(backgroundColor, {
          useNativeDriver: false, // Can't use native driver for colors
          toValue: 1,
          duration: 1800, // smooth background color change
        }),
      ]).start();

      // Fade out and navigate to HomeScreen after the animation finishes
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 200,
        delay: 500, // Delay fade to allow animations to play out
      }).start(() => {
        setBootSplashIsVisible(false);
        navigation.replace("MainTab");
      });
    } catch (error) {
      setBootSplashIsVisible(false);
      navigation.replace("MainTab");  // Ensure navigation even if there's an error
    }
  };

  React.useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);

  return (
    <Animated.View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: backgroundColorInterpolate }}
    >
      <SystemBars barStyle="dark-content" />

      <Text className="absolute bottom-6 text-2xl my-5 leading-8 text-black text-center">
        BRAND NAME
      </Text>

      {/* <Button
        title="Activate push notifications"
        onPress={() => {
          requestNotifications(["alert"]);
        }}
      /> */}

      {bootSplashIsVisible && (
        <Animated.View
          style={[
            {
              opacity: opacity,
              transform: [
                { translateY: translateY },
                { scale: scale },
                { rotate: rotateInterpolate },
              ],
            },
          ]}
          className="absolute inset-0 flex-1 justify-center items-center"
        >
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={500}
            resizeMode="contain"
            onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
            className="h-[140px] w-[170px]"
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

export default SplashScreen;
