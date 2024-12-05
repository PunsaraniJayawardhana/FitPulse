import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import useFormHandler from '../hooks/UseFormHandler';

const LoginScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = useFormHandler({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    const isValid = validate({
      email: { required: true },
      password: { required: true },
    });

    if (isValid) {
      Alert.alert('Login Successful', JSON.stringify(values));
      navigation.navigate('Home')
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Email"
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  registerButton: {
    marginTop: 16,
    backgroundColor: '#6C757D',
  },
});

export default LoginScreen;
