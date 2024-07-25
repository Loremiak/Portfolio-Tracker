// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBAHAMAVqDNig0kaUQhrXy83sw0mY1VaoI',
	authDomain: 'portfolio-tracker-32005.firebaseapp.com',
	projectId: 'portfolio-tracker-32005',
	storageBucket: 'portfolio-tracker-32005.appspot.com',
	messagingSenderId: '867256110024',
	appId: '1:867256110024:web:b847e4f5e289da967e0efd',
	measurementId: 'G-ZDE3CYMV0V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const isLoggedUser = auth.currentUser?.uid;

export { app, auth, isLoggedUser };
