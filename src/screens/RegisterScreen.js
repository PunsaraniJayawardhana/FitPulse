import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
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
      mobileNo: { required: true, numeric: true },
      email: { required: true, email: true }, // Add email validation
      password: { required: true }, // Password validation is handled inside validate
      reenterPassword: { required: true, match: 'password' }, // Ensure it matches 'password'
    });
  
    if (!isValid) return;
  
    // Check if email matches any mock user emails
    const emailExists = mockUsers.some((user) => user.email === values.email);
    if (emailExists) {
      Alert.alert('Error', 'Email is already registered. Please use a different email.');
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
          <View>
  <View style={styles.passwordContainer}>
    <InputField
      label="Password"
      secureTextEntry={!isPasswordVisible}
      value={values.password}
      onChangeText={(value) => handleChange('password', value)}
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
  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
</View>

<View>
  <View style={styles.passwordContainer}>
    <InputField
      label="Re-enter Password"
      secureTextEntry={!isReenterPasswordVisible}
      value={values.reenterPassword}
      onChangeText={(value) => handleChange('reenterPassword', value)}
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
  {errors.reenterPassword && (
    <Text style={styles.errorText}>{errors.reenterPassword}</Text>
  )}
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
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    padding: 16,
    opacity: 0.8,
    marginHorizontal: 16, // Add margin for spacing around the box
  },
  passwordContainer: {
    position: 'relative', // Keep relative for absolute positioning of the eye icon
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '52%', // Keep it vertically centered regardless of input height
    transform: [{ translateY: -12 }], // Adjust to center based on icon size
  },
  input: {
    height: 50, // Maintain a fixed height
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 40, // Space for the eye icon
    fontSize: 16,
    color: 'black',
    marginBottom: 0, // Ensure space between input and error message
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 11, // Space between error message and next input field
  },
  registerButton: {
    marginTop: 16,
    backgroundColor: '#58595D',
    width: '40%',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
