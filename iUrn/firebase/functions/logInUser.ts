import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export default function logInUser(auth: Auth) {
  return async function logInUser(username: string, password: string) {
    try {
    await signInWithEmailAndPassword(auth, username, password)
    } catch(e) {
      return e
    }
  };
}
