import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1iA-zTzcM8ACNyhTgmB4lneFvsbooDvw",
  authDomain: "e-kart-26854.firebaseapp.com",
  projectId: "e-kart-26854",
  storageBucket: "e-kart-26854.firebasestorage.app",
  messagingSenderId: "972584493721",
  appId: "1:972584493721:web:0ae442d7059b9639214e08",
  measurementId: "G-0JNWC4Z0HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { fireDB, auth };
