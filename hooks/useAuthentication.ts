import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

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
      'Registering user with email:',
      email,
      'and password:',
      password,
    );
    if (!validate(email, password)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
      });
      return;
    }
    try {
      const registerUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User registered:', registerUser);
    } catch (err) {
      const error = err as Error;
      console.log('Error registering user:', error);
      Toast.show({
        type: 'error',
        text1: 'Error registering user',
      });
      return;
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    console.log(
      'Logging in user with email:',
      email,
      'and password:',
      password,
    );
    if (!validate(email, password)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
      });
      return;
    }
    try {
      const loginUser = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User logged in:', loginUser);
    } catch (err) {
      const error = err as Error;

      if (error?.message.includes('invalid-credential')) {
        Toast.show({
          type: 'error',
          text1: 'Invalid credentials',
        });
      }
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    console.log('Logging out user');
    try {
      await auth().signOut();
      console.log('User logged out');
    } catch (err) {
      const error = err as Error;
      Toast.show({
        type: 'error',
        text1: 'Error loggging out userd',
      });
      console.log('Error loggging out user:', error);
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
