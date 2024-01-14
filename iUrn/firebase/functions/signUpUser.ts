import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export default function signUpUser(auth: Auth) {
  return async function signUpUser(username: string, password: string, ifError: Function) {
    createUserWithEmailAndPassword(auth, username, password).then((creds) => {
      //TODO: ?
    }).catch((e) => {
      ifError(e)
    })
  };
}
