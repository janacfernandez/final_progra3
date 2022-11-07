import app from 'firebase/app';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDErQMIKkLqqG0BGMDDB5CL5KmpQovnj9Q",
    authDomain: "turistik-ajs3.firebaseapp.com",
    projectId: "turistik-ajs3",
    storageBucket: "turistik-ajs3.appspot.com",
    messagingSenderId: "439948350538",
    appId: "1:439948350538:web:916ad3fddd2c6c2f06c2b3"
  };
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();