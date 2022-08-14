import { Auth } from "firebase/auth";

export default function getUser(auth:Auth){
    return async function getUser() {
        return auth.currentUser
    }
}