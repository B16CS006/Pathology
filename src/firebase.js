import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyBPeTmCUnABBqF5lKkrCKZ8LMdChPyNY-Q",
    authDomain: "patholgoybtp.firebaseapp.com",
    databaseURL: "https://patholgoybtp.firebaseio.com",
    projectId: "patholgoybtp",
    storageBucket: "patholgoybtp.appspot.com",
    messagingSenderId: "608003098590"
})

export const db = app.database();