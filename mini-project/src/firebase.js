import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
    apiKey: "AIzaSyAJ0X2h6tXyY2CCf_Cme0O82_1--xuC0rE",
    authDomain: "chat-app-a14d5.firebaseapp.com",
    projectId: "chat-app-a14d5",
    storageBucket: "chat-app-a14d5.appspot.com",
    messagingSenderId: "738056206431",
    appId: "1:738056206431:web:0b5e972d512c9ee8e883ea",
    measurementId: "G-YGB5LB51GV"
  })

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  export {firestore, auth };