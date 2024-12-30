import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';
import { Ionicons } from '@expo/vector-icons';

const mockUsers = [
  { email: 'test@example.com', password: '@Abcdefghi' },
  { email: 'user@domain.com', password: 'Abcdefghi@' },
];

const RegisterScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    reenterPassword: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReenterPasswordVisible, setIsReenterPasswordVisible] = useState(false);

  const handleRegister = () => {
    const isValid = validate({
      firstName: { required: true },
      lastName: { required: true },
      mobileNo: { required: true },
      email: { required: true, email: true }, // Add email validation
      password: { required: true, minLength: 8 }, // Password must be at least 8 characters
      reenterPassword: { required: true },
    });
  
    if (!isValid) return;
  
    // Check if email matches any mock user emails
    const emailExists = mockUsers.some((user) => user.email === values.email);
    if (emailExists) {
      Alert.alert('Error', 'Email is already registered. Please use a different email.');
      return;
    }
  
    // Check if passwords match
    if (values.password !== values.reenterPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    Alert.alert('Registration Successful');
    navigation.navigate('Login');
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.boxContainer}>
          <InputField
            label="First Name"
            value={values.firstName}
            onChangeText={(value) => handleChange('firstName', value)}
            error={errors.firstName}
            style={styles.input}
          />
          <InputField
            label="Last Name"
            value={values.lastName}
            onChangeText={(value) => handleChange('lastName', value)}
            error={errors.lastName}
            style={styles.input}
          />
          <InputField
            label="Mobile Number"
            keyboardType="phone-pad"
            value={values.mobileNo}
            onChangeText={(value) => handleChange('mobileNo', value)}
            error={errors.mobileNo}
            style={styles.input}
          />
          <InputField
            label="Email"
            keyboardType="email-address"
            value={values.email}
            onChangeText={(value) => handleChange('email', value)}
            error={errors.email}
            style={styles.input}
          />
          <View style={styles.passwordContainer}>
            <InputField
              label="Password"
              secureTextEntry={!isPasswordVisible}
              value={values.password}
              onChangeText={(value) => handleChange('password', value)}
              error={errors.password}
              style={styles.input}
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
          </View>
          <View style={styles.passwordContainer}>
            <InputField
              label="Re-enter Password"
              secureTextEntry={!isReenterPasswordVisible}
              value={values.reenterPassword}
              onChangeText={(value) => handleChange('reenterPassword', value)}
              error={errors.reenterPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.iconContainer}
                onPress={() => setIsReenterPasswordVisible((prev) => !prev)}
                >
                <Ionicons
                  name={isReenterPasswordVisible ? 'eye' : 'eye-off'}
                  size={24}
                  color="gray"
                />
            </TouchableOpacity>
          </View>
          <Button 
            title="Register" 
            onPress={handleRegister}
            style={styles.registerButton} 
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Add padding to top to ensure space at the top
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensure the content can expand to fill the screen
    paddingBottom: 20, // Ensure there's space at the bottom to prevent cut-off when keyboard is open
  },
  boxContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    opacity: 0.8,
    marginHorizontal: 16, // Add margin for spacing around the box
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10, // Increase padding to avoid overlap with icon
    paddingRight: 40, // Add padding for the password icon
    fontSize: 16,
    color: 'black',
    marginBottom: 16, // Ensure space between inputs
  },
  passwordContainer: {
    position: 'relative', 
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '46%',
    transform: [{ translateY: -12 }], // Vertically center the toggle icon
  },
  registerButton: {
    marginTop: 16,
    backgroundColor: '#58595D',
    width: '40%',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
