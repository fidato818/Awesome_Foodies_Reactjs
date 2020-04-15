import firebase from "firebase";

const config = {
  apiKey: "***************************************",
  authDomain: "***************************************",
  databaseURL: "***************************************",
  projectId: "***************************************",
  storageBucket: "***************************************",
  messagingSenderId: "***************************************",
  appId: "***************************************",
  measurementId: "***************************************"
};

// Initialize Firebase
// export default (!firebase.apps.length
//   ? firebase.initializeApp(config)
//   : firebase.app());
firebase.initializeApp(config)
firebase.analytics();
export default firebase
