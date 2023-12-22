import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export default function signUpUser(auth: Auth) {
  return async function signUpUser(username: string, password: string) {
    createUserWithEmailAndPassword(auth, username, password).then((creds) => {
      //TODO: ?
    });
  };
}
