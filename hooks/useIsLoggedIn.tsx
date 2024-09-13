import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setIsLoggedIn(!!authUser);
    });

    return unsubscribe;
  }, []);

  return { isLoggedIn };
};

export default useIsLoggedIn;
