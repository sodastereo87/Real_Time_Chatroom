 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDBifF2BoP8qlsijsJkHkrms838TbNwVxY",
    authDomain: "real-time-chatroom-57c60.firebaseapp.com",
    databaseURL: "https://real-time-chatroom-57c60.firebaseio.com",
    projectId: "real-time-chatroom-57c60",
    storageBucket: "",
    messagingSenderId: "203362186713",
    appId: "1:203362186713:web:b5412435fff18f5a2f15c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();