import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth } from "../firebase" 
import { useNavigate } from "react-router";
import { firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignIn(){
    const navigate = useNavigate();
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then((userCredential) => {
        const user = userCredential.user;
        const isNewUser = userCredential.additionalUserInfo.isNewUser;
        if(isNewUser){
          setDoc(doc(firestore, "users", user.uid), {
            username: user.displayName,
            email: user.email,
            userId: user.uid,
            timestamp: new Date(),
        })
      }
        navigate("/chat-home/1");
      })
    }

    
    return (
      <button onClick={signInWithGoogle}>Google Sign In</button>
    )
  }