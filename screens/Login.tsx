import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import useAuthentication from '../hooks/useAuthentication';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthentication();
  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        style={style.inputWrapper}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        mode="outlined"
        style={style.inputWrapper}
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          style={style.loginButton}
          mode="contained"
          onPress={() => login(email, password)}
        >
          Login
        </Button>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  loginButton: {
    borderRadius: 5,
  },
});
