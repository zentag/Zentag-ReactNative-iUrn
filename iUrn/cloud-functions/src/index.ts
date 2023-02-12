import * as functions from "firebase-functions";
import { getStorage } from "firebase-admin/storage";
import { initializeApp } from "firebase-admin/app";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
initializeApp();

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
