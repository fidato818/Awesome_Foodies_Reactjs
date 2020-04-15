import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBAFV0T0p1OzAJ0AvSChnIPraetH4fzKjQ",
  authDomain: "awsomefoodies.firebaseapp.com",
  databaseURL: "https://awsomefoodies.firebaseio.com",
  projectId: "awsomefoodies",
  storageBucket: "awsomefoodies.appspot.com",
  messagingSenderId: "252615936927",
  appId: "1:252615936927:web:16a65d648df9667d5b0baa",
  measurementId: "G-M0PKH2RF6E"
};

// Initialize Firebase
// export default (!firebase.apps.length
//   ? firebase.initializeApp(config)
//   : firebase.app());
firebase.initializeApp(config)
firebase.analytics();
export default firebase