import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Modal, Text, Button as RNButton } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';

// Mock users for login (email, password pairs)
const mockUsers = [
  { email: 'test@example.com', password: '@Abcdefghi' },
  { email: 'user@domain.com', password: 'Abcdefghi@' },
];

const LoginScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate, resetValues } = useFormHandler({
    email: '',
    password: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('Login'); // To track whether the action is Login or Register

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedEmail = await AsyncStorage.getItem('loggedInEmail');
      if (storedEmail) {
        setIsAlreadyLoggedIn(true);
        setLoggedInEmail(storedEmail);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    // Step 1: Validate email and password
    const isValid = validate({
      email: { required: true, email: true },
      password: { required: true },
    });
  
    if (!isValid) {
      return; // Exit if validation fails
    }
  
    // Step 2: Check if a user is already logged in
    const storedEmail = await AsyncStorage.getItem('loggedInEmail');
    if (storedEmail) {
      // If the user is already logged in, show the modal
      setModalAction('Login');
      setLoggedInEmail(storedEmail);
      setShowModal(true);
      return; // Exit to allow user to handle the modal (logout or cancel)
    }
  
    // Step 3: Check if the entered email and password match a mock user
    const user = mockUsers.find(
      (user) => user.email === values.email && user.password === values.password
    );
  
    if (!user) {
      // If no matching user is found, show login failed alert
      Alert.alert('User not found', 'The email or password is incorrect. Please try again.');
      return; // Exit if the login credentials are invalid
    }
  
    // Step 4: Store the logged-in email and navigate to the home page
    await AsyncStorage.setItem('loggedInEmail', values.email); // Store the login state
    Alert.alert('Login Success');
    navigation.navigate('Home'); // Navigate to the home page
  };  
  

  const handleRegister = async () => {
    const storedEmail = await AsyncStorage.getItem('loggedInEmail');

    if (storedEmail) {
      setModalAction('Register');
      setLoggedInEmail(storedEmail);
      setShowModal(true); // Show the modal if already logged in
      return;
    }

    navigation.navigate('Register'); // Proceed to the Register page if not logged in
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInEmail'); // Clear login state
    setIsAlreadyLoggedIn(false);
    setLoggedInEmail(null);
    setShowModal(false);
    navigation.navigate(modalAction === 'Login' ? 'Welcome' : 'Register'); // Redirect based on action
    resetValues(); // Clear input fields
  };

  return (
    <View style={styles.container}>
      {/* Box Container for Inputs and Buttons */}
      <View style={styles.boxContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="gray"
            style={styles.icon1}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={values.email}
            onChangeText={(value) => handleChange('email', value)}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorEmail}>{errors.email}</Text>}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="gray"
            style={styles.icon2}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={values.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
          {errors.password && <Text style={styles.errorPW}>{errors.password}</Text>}
        </View>

        {/* Buttons */}
        <Button 
          title="Login" 
          onPress={handleLogin} 
          style={styles.loginButton}
        />
        <Button
          title="Register"
          style={styles.registerButton}
          onPress={handleRegister}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              You are already logged in as {loggedInEmail}. You need to log out before {modalAction === 'Login' ? 'logging in' : 'registering'} as a different user.
            </Text>
            <View style={styles.modalButtons}>
              <RNButton title="Logout" onPress={handleLogout} color="#FF0000" />
              <RNButton title="Cancel" onPress={() => {
                setShowModal(false);
                navigation.navigate(modalAction === 'Login' ? 'Home' : 'Login');
              }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  boxContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    padding: 16,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 40, // Increase padding to avoid overlap with icon
    paddingRight: 40, // Add padding for the password icon
    fontSize: 16,
    color: 'black'
  },
  icon1: {
    position: 'absolute',
    left: 10, // Position the email/password icon on the left
    top: '52%',
    transform: [{ translateY: -12 }], // Vertically center the icon
  },
  icon2: {
    position: 'absolute',
    left: 10, // Position the email/password icon on the left
    top: '49%',
    transform: [{ translateY: -12 }], // Vertically center the icon
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '53%',
    transform: [{ translateY: -12 }], // Vertically center the toggle icon
  },
  errorEmail: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    position: 'absolute',
    bottom: -20, // Keeps the error message below the input
    left: 16,
  },
  errorPW: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    position: 'absolute',
    bottom: -43, // Keeps the error message below the input
    left: 16,
  },
  loginButton: {
    marginTop: 33,
    backgroundColor: '#58595D',
    width: '40%',
    alignSelf: 'center',
  },
  registerButton: {
    marginTop: 16,
    backgroundColor: '#58595D',
    width: '40%',
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default LoginScreen;