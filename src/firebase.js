import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'react-slack-app-170ce.firebaseapp.com',
  databaseURL: 'https://react-slack-app-170ce.firebaseio.com',
  projectId: 'react-slack-app-170ce',
  storageBucket: 'react-slack-app-170ce.appspot.com',
  messagingSenderId: '173197745598',
  appId: '1:173197745598:web:4918fde56186bb761aadef',
  measurementId: 'G-RERL35P84T'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
