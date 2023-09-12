import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth } from "../firebase" 
import { useNavigate } from "react-router";

export default function SignIn(){
    const navigate = useNavigate();
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then((userCredential) => {
        const user = userCredential.user;
        navigate("/chat-home/1");
      })
    }

    
    return (
      <button onClick={signInWithGoogle}>Google Sign In</button>
    )
  }