import { Auth, signOut } from "firebase/auth";

export default function signOutUser(auth: Auth) {
  return async function signOutUser() {
    signOut(auth)
  };
}
