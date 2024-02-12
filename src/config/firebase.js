import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_5WMRvOFz92TvkONcXdfsYnmFykgJSgM",
  authDomain: "pesutupa-sovellus.firebaseapp.com",
  projectId: "pesutupa-sovellus",
  storageBucket: "pesutupa-sovellus.appspot.com",
  messagingSenderId: "489635063793",
  appId: "1:489635063793:web:50bd1f8ee575f19ef3c650",
  measurementId: "G-FCJRPVQVEM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider() 

//const analytics = getAnalytics(app);
