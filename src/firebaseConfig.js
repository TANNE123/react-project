// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRWFGn_qYeJXbHjjtdwdA_DnGs_oMZGZM",
  authDomain: "genarateurl.firebaseapp.com",
  projectId: "genarateurl",
  storageBucket: "genarateurl.appspot.com",
  messagingSenderId: "118277384673",
  appId: "1:118277384673:web:c020b9dd3ae698059e0aa0",
  measurementId: "G-Q7DHJT6633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Analytics (optional, only if you're using it)
const analytics = getAnalytics(app);

// Export the Firebase app and storage
export { app, analytics, storage };
