import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



let firebaseConfig = {

    apiKey: "AIzaSyBJdDUEKYdxnueUNGmGcBzbHTSQSmIcP64",
    authDomain: "kustomdesign-1b99f.firebaseapp.com",
    projectId: "kustomdesign-1b99f",
    storageBucket: "kustomdesign-1b99f.appspot.com",
    messagingSenderId: "670610927068",
    appId: "1:670610927068:web:068d1a73f0884efbd23319",
    measurementId: "G-ZPFNBJMRRQ"

};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };