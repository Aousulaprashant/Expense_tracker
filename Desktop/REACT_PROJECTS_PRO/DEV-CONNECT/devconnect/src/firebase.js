// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6TDIZfXi3O3kvA747pR9pTqrrb9zV1Uk",
  authDomain: "dev-overflow-e2c7c.firebaseapp.com",
  projectId: "dev-overflow-e2c7c",
  storageBucket: "dev-overflow-e2c7c.firebasestorage.app",
  messagingSenderId: "525449747434",
  appId: "1:525449747434:web:241c3ecbe326097cd23093",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
