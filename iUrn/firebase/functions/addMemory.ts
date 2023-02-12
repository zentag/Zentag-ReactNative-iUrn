import { Auth } from "firebase/auth";
import { addDoc, collection, Firestore } from "firebase/firestore";
import {
  FirebaseStorage,
  ref,
  StorageReference,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { Platform } from "react-native";
import { v4 as uuidv4 } from "uuid";

export default function addMemory(
  auth: Auth,
  db: Firestore,
  storage: FirebaseStorage
) {
  return async function addMemory(image: string, Description: string) {
    const user = auth.currentUser;
    if (!user) return;
    const uid = uuidv4();
    const storageRef = ref(storage, `memoryVaultImages/${uid}.jpg`);
    await addDoc(collection(db, "Pages", user.uid, "MemoryVault"), {
        ImageSource:`memoryVaultImages/${uid}.jpg`,
        Description
    })
    if (Platform.OS === "android" && image[0] === "/") {
        image = `file://${image}`;
        image = image.replace(/%/g, "%25");
      }
      uploadImageAsync(image, storageRef)
  };
}

async function uploadImageAsync(uri:string, Ref:StorageReference) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob:any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    await uploadBytes(Ref, blob, {contentType:"image/jpeg"})
  
    // We're done with the blob, close and release it
    blob.close();
  }