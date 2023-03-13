// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6snSXVEukKtZqEdbwqB_Y7q9yLYw7B8g",
  authDomain: "demo01-617c1.firebaseapp.com",
  projectId: "demo01-617c1",
  storageBucket: "demo01-617c1.appspot.com",
  messagingSenderId: "285874534816",
  appId: "1:285874534816:web:aeb6ace9da5f6e46e1ccc5",
  measurementId: "G-0JK3TJ9L50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);