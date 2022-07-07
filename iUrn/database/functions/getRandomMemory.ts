import {
  Firestore,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { FirebaseStorage, ref, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
export default function getRandomMemory(db: Firestore, storage:FirebaseStorage) {
  return async (userId: string) => {
    const key = uuidv4()
    const collectionRef = collection(db, "Users", userId, "MemoryVault");
    let queryRef = query(
      collectionRef,
      where("__name__", ">=", key),
      orderBy("__name__"),
      limit(1)
    );
    let querySnapshot = await getDocs(queryRef);
    if (querySnapshot.empty) {
    const newQueryRef = query(
        collectionRef,
        where("__name__", "<", key),
        orderBy("__name__"),
        limit(1)
      );
      querySnapshot = await getDocs(newQueryRef);
    }
    const docData = querySnapshot.docs[0].data()
    const img = await getDownloadURL(ref(storage, docData.ImageSource))
    delete docData.ImageSource
    return {img, ...docData}
  };
}
