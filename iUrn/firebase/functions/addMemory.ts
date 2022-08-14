import { Auth } from "firebase/auth";
import { addDoc, collection, Firestore } from "firebase/firestore";
import { FirebaseStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs'

export default function addMemory(auth:Auth, db:Firestore, storage:FirebaseStorage){
    return async function addMemory(image:string, Description:string) {
        const user = auth.currentUser
        if(!user) return
        const uid = uuidv4()
        const storageRef = ref(storage, `memoryVaultImages/${uid}.jpg`)
        // const docRef = await addDoc(collection(db, "Users", user.uid, "MemoryVault"), {
        //     ImageSource:`memoryVaultImages/${uid}.jpg`,
        //     Description
        // })
        console.warn()
        uploadString(storageRef, await RNFS.readFile(image, "base64"), "raw")
    }
}