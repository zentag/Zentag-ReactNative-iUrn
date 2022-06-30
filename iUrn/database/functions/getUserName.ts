import { FirebaseApp } from "firebase/app";
import { collection, doc, Firestore, getDoc } from "firebase/firestore";
export default function getUserName(db: Firestore) {
  return async (userId: string) => {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef)
    // return docSnap.data()?.name
    console.warn(docSnap.data())
    return userId
  };
}
