import Rebase from "re-base";
import firebase from "firebase";

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDAm4Pmi3gzcMlM8IJOuQSpwhHoHzR-go",
  authDomain: "board-room-mw.firebaseapp.com",
  databaseURL: "https://board-room-mw.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export

export default base;
