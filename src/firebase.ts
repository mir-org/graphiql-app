import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5QAwbJYbNzA1aA_Hamahg9hUZ9plfGvY',
  authDomain: 'graphiql-bf6de.firebaseapp.com',
  projectId: 'graphiql-bf6de',
  storageBucket: 'graphiql-bf6de.appspot.com',
  messagingSenderId: '212188522180',
  appId: '1:212188522180:web:04ce868ee58cc95bfe8b91',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(err);
      alert(err.message);
      throw err;
    } else {
      console.error(err);
      alert('An unexpected error occurred.');
      throw err;
    }
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(err);
      alert(err.message);
    } else {
      console.error(err);
      alert('An unexpected error occurred.');
    }
  }
};

export const logout = () => {
  signOut(auth);
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(err);
      alert(err.message);
    } else {
      console.error(err);
      alert('An unexpected error occurred.');
    }
  }
};

export default app;