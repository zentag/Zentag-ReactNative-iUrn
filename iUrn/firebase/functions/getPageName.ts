import { doc, Firestore, getDoc } from "firebase/firestore";
export default function getPageName(db: Firestore) {
  return async (userId: string) => {
    const docRef = doc(db, "Pages", userId);
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data()?.Name : null
  };
}
