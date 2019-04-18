import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyD5rGhdAsskw6FcUClxoMfqeKLkftncuMk",
    authDomain: "pathology-233213.firebaseapp.com",
    databaseURL: "https://pathology-233213.firebaseio.com",
    projectId: "pathology-233213",
    storageBucket: "",
    messagingSenderId: "338066448825"
})

export const db = app.database();