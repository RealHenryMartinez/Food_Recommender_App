import { initializeApp } from "firebase/app";
import {
	getReactNativePersistence,
	initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// NOTE: error Firebase: Error (auth/already-initialized) might occur when editing as the storage is already initialized with an auth so it will duplicate another making the error as a result
// Initialize our app configuration
const firebaseConfig = {
	apiKey: "AIzaSyDEe__46T41ighYPZtzMf4zY0ObTbxo2d8",
	authDomain: "foodrecommender-cc7d7.firebaseapp.com",
	projectId: "foodrecommender-cc7d7",
	storageBucket: "foodrecommender-cc7d7.appspot.com",
	messagingSenderId: "373408070276",
	appId: "1:373408070276:web:bfc680f21f81a74a17e0d1",
	measurementId: "G-1S3B2SJV7W",
};
// Initialize our app
let app = initializeApp(firebaseConfig);
export let auth:any = null; 
if (auth === null){
	// Create a new auth object with setting it to the storage to store the user's data as expo/firebase removed the default feature 
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}//
