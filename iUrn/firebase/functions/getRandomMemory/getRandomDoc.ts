import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
    Firestore,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    DocumentData,
  } from "firebase/firestore";

export default async function getRandomDoc(db:Firestore, userId:string): Promise<null | DocumentData>{
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
    return querySnapshot.empty ? null : querySnapshot.docs[0].data()
}