import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';

const StyledComponentsExample = () => {
  const buttonOpacity = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(buttonOpacity, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg' }}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to React Native Style</Text>
        <Text style={styles.subtitle}>
          A beautiful UI with React Native and custom styles
        </Text>
        <Animated.View style={{ opacity: buttonOpacity }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(to bottom, #4299e1, #3182ce)',
  },
  card: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3182ce',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StyledComponentsExample;
