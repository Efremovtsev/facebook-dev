import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: 'facebook-dev-4e847.firebaseapp.com',
    projectId: 'facebook-dev-4e847',
    storageBucket: 'facebook-dev-4e847.appspot.com',
    messagingSenderId: '402292553325',
    appId: '1:402292553325:web:51e216917998e743713164',
};

const app = firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();

const database = app.firestore();
const auth = app.auth();
const storage = firebase.storage();

export { auth, database, storage };
