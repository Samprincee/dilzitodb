import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjTQbFO3t9Si51BgIEb8wlrsPKsnJf0EA",
  authDomain: "dilzito-789cc.firebaseapp.com",
  projectId: "dilzito-789cc",
  storageBucket: "dilzito-789cc.appspot.com",
  messagingSenderId: "418997325032",
  appId: "1:418997325032:web:ce52c04bb60768ddb94d5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db , storage};