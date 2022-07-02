import getUserName from "./functions/getUserName";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, initializeFirestore } from "firebase/firestore"
class Database {
  getUserName: Function;
  app: FirebaseApp;
  firestore:Firestore;
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDy5QIL0Lhj7dOR_UZWmIVeo7TttR7ROrA",
      authDomain: "iurn-973d0.firebaseapp.com",
      projectId: "iurn-973d0",
      storageBucket: "iurn-973d0.appspot.com",
      messagingSenderId: "846449794739",
      appId: "1:846449794739:web:58a8db3e20b525b5679ac6",
      measurementId: "G-MR8KTYSGKE",
    };
 
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.firestore = initializeFirestore(this.app, {
      experimentalForceLongPolling: true,
    })
    this.getUserName = getUserName(this.firestore);
  }
}

export default new Database();
