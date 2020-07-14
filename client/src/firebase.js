import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDHuQgyLcQ8qKH3d9hFJv4iPVNpoVXm8vI",
  authDomain: "gqlreactnode-7117b.firebaseapp.com",
  //   databaseURL: "https://gqlreactnode-7117b.firebaseio.com",
  projectId: "gqlreactnode-7117b",
  storageBucket: "gqlreactnode-7117b.appspot.com",
  //   messagingSenderId: "316958590428",
  appId: "1:316958590428:web:b2338b19d8fe03a2c93b19",
  measurementId: "G-B0B37TVQ4Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
