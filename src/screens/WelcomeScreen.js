import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Our App!</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')} // Navigates to the Login screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
