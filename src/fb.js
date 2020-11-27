import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzn71Z9BhuajlqphCnCKR_lsBGMxStcOs",
  authDomain: "class-schudele.firebaseapp.com",
  databaseURL: "https://class-schudele.firebaseio.com",
  projectId: "class-schudele",
  storageBucket: "class-schudele.appspot.com",
  messagingSenderId: "607784785596",
  appId: "1:607784785596:web:116e685088d462bc47a2b9",
  measurementId: "G-PQDJMY565C"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({timestampsInSnapshots: true});

export default db;