import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { auth } from "@/config/firebase";

const validate = (email: string, password: string) => {
  if (!email || !password) {
    return false;
  }
  return true;
};

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const register = async (email: string, password: string) => {
    setLoading(true);
    console.log(
      "Registering user with email:",
      email,
      "and password:",
      password
    );
    if (!validate(email, password)) {
      Toast.show({
        type: "error",
        text1: "Invalid email or password",
      });
      return;
    }
    try {
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", registerUser);
    } catch (err) {
      const error = err as Error;
      console.log("Error registering user:", error);
      Toast.show({
        type: "error",
        text1: "Error registering user",
      });
      return;
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    console.log(
      "Logging in user with email:",
      email,
      "and password:",
      password
    );
    if (!validate(email, password)) {
      Toast.show({
        type: "error",
        text1: "Invalid email or password",
      });
      return;
    }
    try {
      const registerUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", registerUser);
    } catch (err) {
      const error = err as Error;
      Toast.show({
        type: "error",
        text1: "Error login user",
      });
      console.log("Error login user:", error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    console.log("Logging out user");
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (err) {
      const error = err as Error;
      Toast.show({
        type: "error",
        text1: "Error loggging out userd",
      });
      console.log("Error loggging out user:", error);
    }
    setLoading(false);
  };

  return {
    register,
    login,
    logout,
    loading,
  };
};

export default useAuthentication;
