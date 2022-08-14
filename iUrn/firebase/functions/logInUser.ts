import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export default function logInUser(auth: Auth) {
  return async function logInUser(username: string, password: string) {
    signInWithEmailAndPassword(auth, username, password).then((creds) => {
      //TODO: ?
    });
  };
}
