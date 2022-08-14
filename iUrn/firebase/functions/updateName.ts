import { Auth } from "firebase/auth";
import { doc, Firestore, getDoc, updateDoc } from "firebase/firestore";

export default function updateName(auth:Auth, db:Firestore){
    return async function updateName(names:string[]) {
        const name = names.join(" ")
        const user = auth.currentUser
        if(!user) return
        const docRef = doc(db, "Users", user.uid)
        await updateDoc(docRef, {
            Name: name
        })
    }
}