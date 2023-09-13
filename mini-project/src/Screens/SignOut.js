import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth } from "../firebase" 


export default function SignOut(){
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }