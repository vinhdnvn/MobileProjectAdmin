import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCYSy6HA_wcK6ARpC7L_-r15aj9ZpGryNQ",
	authDomain: "ticketbox-dd2b9.firebaseapp.com",
	projectId: "ticketbox-dd2b9",
	storageBucket: "ticketbox-dd2b9.appspot.com",
	messagingSenderId: "244272189056",
	appId: "1:244272189056:web:0ce20051b11617e349a065",
	measurementId: "G-CLYXRY7DHP",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
export { firebase };
