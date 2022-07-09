
import { Firestore } from "firebase/firestore";
import { FirebaseStorage, ref, getDownloadURL } from "firebase/storage";
import getRandomDoc from "./getRandomDoc";
export default function getRandomMemory(db: Firestore, storage:FirebaseStorage) {
  return async (userId: string | null) => {
    if(!userId) return null
    try {
    const docData = await getRandomDoc(db, userId)
    if(!docData) return null
    const img = await getDownloadURL(ref(storage, docData.ImageSource))
    delete docData.ImageSource
    return {img, ...docData}
    } catch(e) {
      
    }
  };
}
