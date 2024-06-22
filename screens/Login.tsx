import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import useAuthentication from "@/hooks/useAuthentication";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthentication();
  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        style={style.inputWrapper}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        mode="outlined"
        style={style.inputWrapper}
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button mode="outlined" onPress={() => login(email, password)}>
        {loading ? <ActivityIndicator /> : "Login"}
      </Button>
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
});
