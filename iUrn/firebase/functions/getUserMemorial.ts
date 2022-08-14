import { DocumentData, Firestore } from "firebase/firestore";
import { FirebaseStorage, ref, getDownloadURL } from "firebase/storage";
import IFirebase from "../IFirebase";
import getUserDoc from "./getUserDoc";
export default function getUserMemorial(db: Firestore, storage:FirebaseStorage) {
  return async (userId: string | null) => {
    if(!userId) return null
    try {
    const docData:DocumentData | null = await getUserDoc(db)(userId)
    if(!docData) return null
    // TODO: research file types, converting, and how much each takes up
    const img = await getDownloadURL(ref(storage, `memorialImages/${userId}.jpg`))
    return {img, ...docData}
    } catch(e) {
      //TODO: error handling
    }
  };
}