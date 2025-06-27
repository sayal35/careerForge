// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Import Firestore separately
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIa2mTZy_tSBD7yU15eFuD8CKI_2eH6cQ",
  authDomain: "careerforge-5ba05.firebaseapp.com",
  projectId: "careerforge-5ba05",
  storageBucket: "careerforge-5ba05.appspot.com", // Note: fix typo here: it should be ".appspot.com"
  messagingSenderId: "261304101128",
  appId: "1:261304101128:web:a4f9fb753fa871491be4bd",
  measurementId: "G-VDF939SDF6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db, analytics };
