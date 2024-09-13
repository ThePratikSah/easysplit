import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Initialize Firestore
const db = firestore();

export { auth, db };
