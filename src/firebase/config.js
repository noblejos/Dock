import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAccbT1MAeUbfYEUvXdtN2VQBl65vb_YPc",
    authDomain: "dock-e0057.firebaseapp.com",
    projectId: "dock-e0057",
    storageBucket: "dock-e0057.appspot.com",
    messagingSenderId: "964900613362",
    appId: "1:964900613362:web:752c68435ee5b1c1c0346b"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  const timestamp = firebase.firestore.Timestamp
 


  export { projectFirestore, projectAuth, projectStorage, timestamp}