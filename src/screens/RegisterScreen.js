import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';

const RegisterScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    reenterPassword: '',
  });

  const handleRegister = () => {
    const isValid = validate({
      firstName: { required: true },
      lastName: { required: true },
      mobileNo: { required: true },
      email: { required: true },
      password: { required: true, minLength: 6 },
      reenterPassword: { required: true },
    });

    if (!isValid) return;

    // Check if passwords match
    if (values.password !== values.reenterPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    Alert.alert('Registration Successful', JSON.stringify(values));
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <InputField
        label="First Name"
        value={values.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        error={errors.firstName}
      />
      <InputField
        label="Last Name"
        value={values.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        error={errors.lastName}
      />
      <InputField
        label="Mobile Number"
        keyboardType="phone-pad"
        value={values.mobileNo}
        onChangeText={(value) => handleChange('mobileNo', value)}
        error={errors.mobileNo}
      />
      <InputField
        label="Email"
        keyboardType="email-address"
        value={values.email}
        onChangeText={(value) => handleChange('email', value)}
        error={errors.email}
      />
      <InputField
        label="Password"
        secureTextEntry
        value={values.password}
        onChangeText={(value) => handleChange('password', value)}
        error={errors.password}
      />
      <InputField
        label="Re-enter Password"
        secureTextEntry
        value={values.reenterPassword}
        onChangeText={(value) => handleChange('reenterPassword', value)}
        error={errors.reenterPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});

export default RegisterScreen;
