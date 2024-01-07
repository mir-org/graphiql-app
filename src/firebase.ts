import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWsgrsZygqjUCgj3m-UsEaXE_0dektanc',
  authDomain: 'graphiqlrelease.firebaseapp.com',
  projectId: 'graphiqlrelease',
  storageBucket: 'graphiqlrelease.appspot.com',
  messagingSenderId: '729783132956',
  appId: '1:729783132956:web:d3e4b10de44f38976490d9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    name,
    authProvider: 'local',
    email,
  });
};

export const logout = () => {
  signOut(auth);
};

export default app;
