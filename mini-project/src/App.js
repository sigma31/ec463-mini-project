import React from 'react';
import './App.css';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import {useRef} from 'react';

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

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
      </header>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <button onClick={signInWithGoogle}>Google Sign In</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  
  const dummy = useRef();
  
  const messageReference = firestore.collection('messages');
  const query = messageReference.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL } = auth.currentUser;

    await messageReference.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({behavior : 'smooth'});
  }

  return (
    <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      <div ref={dummy}></div>
    </main>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type="submit"> Send </button>
    </form>
    </>
  )
}

function ChatMessage(props){
  const {text, uid, photoURL } = props.message;
  const messageClass = uid == auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>

    </div>
  )
}

export default App;
