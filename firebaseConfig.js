import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCt3ZyjjGGzLLrb76FFGGJeQAcG4hF-MXE",
  authDomain: "projetobloco-f1e10.firebaseapp.com",
  databaseURL: "https://projetobloco-f1e10-default-rtdb.firebaseio.com",
  projectId: "projetobloco-f1e10",
  storageBucket: "projetobloco-f1e10.appspot.com",
  messagingSenderId: "386068205498",
  appId: "1:386068205498:web:cd0616bbc414c16cdd1783",
  measurementId: "G-J0HQ9W41HD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
