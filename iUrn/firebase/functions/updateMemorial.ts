import { Auth } from "firebase/auth";
import { doc, Firestore, updateDoc } from "firebase/firestore";

export default function updateMemorial(auth:Auth, db:Firestore){
    return async function updateMemorial(memorial:string) {
        if(!auth.currentUser) return //TODO: throw error
        const ref = doc(db, "Pages", auth.currentUser.uid)
        updateDoc(ref, {
            Memorial:memorial
        })
    }
}