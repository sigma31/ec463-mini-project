import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route }
    from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import {useRef} from 'react';


import SignIn from './Screens/SignIn';
import ChatHome from './Screens/ChatHome';

import {auth, firestore} from "./firebase.js";


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/"
                        element={<SignIn />} />
                    <Route path="/chat-home/:receiverId"
                        element={<ChatHome />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
