import { Auth, sendPasswordResetEmail } from "firebase/auth";

export default function sendResetEmail(auth: Auth) {
  return async function sendResetEmail(email:string) {
    try {
    await sendPasswordResetEmail(auth, email)
    } catch(e) {
      return e
    }
  };
}
