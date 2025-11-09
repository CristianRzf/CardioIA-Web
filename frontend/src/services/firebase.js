// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1WBc-ixQiBAls-uPBkNP90xmzp5hPIOo",
    authDomain: "cardioia-d2a7a.firebaseapp.com",
    projectId: "cardioia-d2a7a",
    storageBucket: "cardioia-d2a7a.firebasestorage.app",
    messagingSenderId: "834101819967",
    appId: "1:834101819967:web:d12df946afdcbab707168a",
    measurementId: "G-D8WFVZK30P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const ANALYTICS = getAnalytics(app);