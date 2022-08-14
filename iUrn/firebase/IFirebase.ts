import getUserName from "./functions/getUserName";
import getUserDoc from "./functions/getUserDoc"
import getRandomMemory from "./functions/getRandomMemory";
import getUserMemorial from "./functions/getUserMemorial";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, initializeFirestore } from "firebase/firestore"
import {FirebaseStorage, getStorage} from "firebase/storage"
import {Auth, browserLocalPersistence, getAuth, setPersistence} from "firebase/auth"
import logInUser from "./functions/logInUser";
import signUpUser from "./functions/signUpUser";
import setupCheck from "./functions/setupCheck";
import updateName from "./functions/updateName";
import getUser from "./functions/getUser";
import updateMemorial from "./functions/updateMemorial";
import addMemory from "./functions/addMemory";
class IFirebase {
  //TODO: typing
  getUserName: Function;
  app: FirebaseApp;
  firestore:Firestore;
  getUserDoc:Function;
  getRandomMemory:Function;
  storage: FirebaseStorage;
  getUserMemorial:Function;
  logInUser:Function;
  auth:Auth;
  signUpUser:Function;
  setupCheck:Function;
  updateName:Function;
  getUser:Function;
  updateMemorial:Function;
  addMemory:Function;
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
    this.storage = getStorage(this.app)
    this.auth = getAuth(this.app)
    this.logInUser = logInUser(this.auth)
    this.signUpUser = signUpUser(this.auth)
    this.setupCheck = setupCheck(this.auth, this.firestore)
    this.updateName = updateName(this.auth, this.firestore)
    this.getUserName = getUserName(this.firestore);
    this.getUserDoc = getUserDoc(this.firestore)
    this.getRandomMemory = getRandomMemory(this.firestore, this.storage)
    this.getUserMemorial = getUserMemorial(this.firestore,this.storage)
    this.getUser = getUser(this.auth)
    this.updateMemorial = updateMemorial(this.auth, this.firestore)
    this.addMemory = addMemory(this.auth, this.firestore, this.storage)
  }
}

export default new IFirebase();