import * as functions from "firebase-functions";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { v4 as uuidv4 } from "uuid"
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
initializeApp();
export const addUserDocument = functions.auth.user().onCreate((user) => {
  const uuid = uuidv4()
  const firestore = getFirestore()
  const userDoc = firestore.doc(`/Users/${user.uid}`)
  const pageDoc = firestore.doc(`/Pages/${uuid}`)
  userDoc.set({Nickname:"Set your name on your page",Pages:[uuid]})
  pageDoc.set({Owner:user.uid,Name:"Default page"})
})
export const deleteImageOnDocumentDelete = functions.firestore
  .document("Pages/{userID}/MemoryVault/{deletedDoc}")
  .onDelete((snap) => {
    const storage = getStorage().bucket();
    const deletedData = snap.data();
    const file = storage.file(deletedData?.ImageSource);
    file
      .delete()
      .then(() => {
        return console.log("successful");
      })
      .catch((e) => {
        console.log(e);
      });
  });
