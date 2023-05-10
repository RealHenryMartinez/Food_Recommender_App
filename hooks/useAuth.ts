import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"; // Import firebase authentication functions
import { auth } from "../util/firebaseConfig"; // Import the Firebase authentication instance
import { useAppDispatch, useAppSelector } from "../store/Features/hook"; // Import Redux hooks
import axios from "axios"; // Import Axios for making HTTP requests
import { CREATE_USER_ENDPOINT, USER_URI } from "../util/constants"; // Import constants
import { ICredentials, IUserState } from "../interfaces/authInterface"; // Import interface for user credentials and user state
import {
	getAllUsers, // Import a Redux slice action to fetch all users from the server
	userFound, // Import a Redux slice action to update the state when a user is found
	userInformationState, // Import a Redux selector to get the user information from the state
	userLoggedOut, // Import a Redux slice action to update the state when a user logs out
} from "../store/AuthSlices/useAuthSlice";

interface ISelectedImage { // Define an interface for selected image
	uri: string;
	name: string | null | undefined;
	type: string;
}

// Define a function to check if the file size is less than the given value in MB
export const isLessThanTheMB = (
	fileSize: number,
	smallerThanSizeMB: number
) => {
	const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
	return isOk;
};

// Define the custom hook
export default function useAuth() {
	// Set up state for user information form, user login form, and other state variables
	const [userInfoForm, setUserInfoForm] = useState<IUserState>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [userLoginForm, setUserLoginForm] = useState<ICredentials>({
		email: "",
		password: "",
	});

	const [showProfileImagePicker, setShowProfileImagePicker] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [goToPhoto, setGoToPhoto] = useState<boolean>(false);

	// Get dispatch function from Redux
	const dispatch = useAppDispatch();
	// Get user information from Redux state
	const userInfo = useAppSelector(userInformationState);
	// Check if the user is logged in
	const logStatus = userInfo.loggedIn;

	// Function to create a user and send a request to the server to save the user information
	const createUser = async (): Promise<void> => {
		try {
			if (auth) {
				// Send a request to the server to create a new user
				await axios
					.post(USER_URI + CREATE_USER_ENDPOINT, {
						data: userInfoForm,
						headers: {
							Accept: "application/json",
							"Content-Type": "multipart/form-data",
						},
					})
					.then((response) => {
						console.log(response.request._response);
					})
					.catch((error) => {
						console.log("Missing or Invalid request");
					});
				// Sign in the user with the given email and password
				signInWithEmailAndPassword(
					auth,
					userInfoForm.email,
					userInfoForm.password
				)
					.then((userCredential) => {
						console.log("Signed In");
						// set the user as a variable
						const user = userCredential.user;
						setGoToPhoto(true);
						dispatch(userFound());
						return user;
					})
					.catch((err) => {
						console.log("not signed in");
						console.log(err);
						alert(err.message);
					});
			}
		} catch (err) {
			alert("Error creating user");
		}
	};
	const signUserIn = () => {
		if (auth) {
			signInWithEmailAndPassword(
				auth,
				userLoginForm.email,
				userLoginForm.password
			)
				// takes in the credentials from email and password
				.then((userCredential) => {
					console.log("Signed In");
					// set the user as a variable
					const user = userCredential.user;
					dispatch(userFound());
					return user;
				})
				.catch((err) => {
					alert(err.message);
				});
		}
	};
	/**
	 * Call the redux slice to send a request to grab the authenticated information from the mongodb server
	 */
	const getLoggedInUserData = async () => {
		try {
			await dispatch(getAllUsers());
		} catch (err) {
			console.log("no users found with this email address", err);
		}
	};

	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		async function fetchUserDataAsync() {
		  // after user is confirmed, grab their data
		  try {
			const restaurants = await getLoggedInUserData()
			setIsDone(true)
			return restaurants;
		  } catch (e) {
			console.log(e)
		  }
		}
		fetchUserDataAsync()
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(userFound()); // Change the page to the logged in user
				setUser(user);
			} else {
				dispatch(userLoggedOut());
			}
			setIsDone(true); // Update the state
		});

		return () => unsubscribe(); // Call firebase to unsubscribe when the component unmounts
		
	  }, [])

	return {
		goToPhoto,
		isDone,
		setUserInfoForm,
		userInfoForm,
		createUser,
		userLoginForm,
		setUserLoginForm,
		signUserIn,
	};
}
