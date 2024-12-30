import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity
      duration: 1700, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')} // Replace with your image file path
      style={styles.background}
      resizeMode="cover"
    >
      {/* Centered text at the top */}
      <View style={styles.topContainer}>
        <Text style={styles.topText}>FitPulse</Text>
      </View>

      {/* Centered main content */}
      <View style={styles.mainContent}>
        <Animated.Text // Use Animated.Text for animating the text
          style={[styles.welcomeText, { opacity: fadeAnim }]} // Bind opacity to the animation
        >
          Your Perfect Workout{'\n'}Awaits
        </Animated.Text>
      </View>

      {/* Login Button at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')} // Navigates to the Login screen
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically in the background
    alignItems: 'center', // Center the content horizontally in the background
  },
  topContainer: {
    position: 'absolute',
    top: '36%', // Adjust to position the top text vertically in the upper portion
    left: 0,
    right: 0,
    alignItems: 'center', // Center the top text horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topText: {
    fontSize: 35,
    fontFamily: 'Georgia',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: '#E7E7E7', // Black shadow color
    textShadowOffset: { width: 1, height: 1 }, // Offset for shadow
    textShadowRadius: 2,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1, // This ensures the main content fills the available space
    justifyContent: 'center', // Vertically center the welcomeText
    alignItems: 'center', // Horizontally center the welcomeText
  },
  welcomeText: {
    fontSize: 19, // Adjusted size for emphasis
    textAlign: 'center', // Centers the text horizontally
    color: '#FFFFFF', // Makes the text readable against the background
    fontFamily: 'CustomFont-Bold', // Replace with your font file name
    textShadowColor: '#E7E7E7', // Black shadow color
    textShadowOffset: { width: 1, height: 1 }, // Offset for shadow
    textShadowRadius: 4, // Blur radius for shadow
    marginBottom: 35, // Adds spacing between the text and button
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Keeps the button at the bottom with spacing
    left: 0,
    right: 0,
    alignItems: 'center', // Center the button horizontally
  },
  loginButton: {
    backgroundColor: '#2B2B2D', // Dark background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 30, // Horizontal padding
    borderRadius: 8, // Rounded corners
    marginBottom: 20, // Space from the bottom edge
    opacity: 0.9,
  },
  loginButtonText: {
    color: '#E8E8E9', // Button text color
    fontSize: 18, // Font size for the button text
    fontWeight: 'bold', // Bold font
    textAlign: 'center', // Centers the text inside the button
  },
});

export default WelcomeScreen;
