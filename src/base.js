import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_p3x5H23x8G97As4sUecEVDmiVZoensQ",
    authDomain: "catch-of-the-day-ce337.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ce337.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
