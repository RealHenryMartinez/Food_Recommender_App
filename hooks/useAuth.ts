import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { useAppDispatch } from "../store/Features/hook";
import axios from 'axios'
import { CREATE_USER_ENDPOINT, USER_URI } from "../util/constants";
import { ICredentials, IUserState } from "../interfaces/authInterface";
import {
	getAllUsers,
	userFound,
	userLoggedOut,
} from "../store/AuthSlices/useAuthSlice";

interface ISelectedImage {
	uri: string;
	name: string | null | undefined;
	type: string;
}

export const isLessThanTheMB = (
	fileSize: number,
	smallerThanSizeMB: number
) => {
	const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
	return isOk;
};

export default function useAuth() {
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

	const dispatch = useAppDispatch();
	
	// // Create the user in our server
	// // Used to send data via a form data request for the use of the file system in our server
	const createUser = async (): Promise<void> => {
		try {
			if (auth) {
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
				signInWithEmailAndPassword(
					auth,
					userInfoForm.email,
					userInfoForm.password
				)
					// takes in the credentials from email and password
					.then((userCredential) => {
						console.log("Signed In");
						// set the user as a variable
						const user = userCredential.user;
						setGoToPhoto(true);
						//dispatch(userFound());
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
		async function fetchUserAsync() {
			try {
				await getLoggedInUserData(); // Send server request to fetch all the users from the database
				dispatch(userFound()); // Change the page to the logged in user

				const unsubscribe = onAuthStateChanged(auth, (user) => {
					if (user) {
						setUser(user);
						setIsDone(true); // Update the state
					} else {
						dispatch(userLoggedOut());
						setIsDone(true); // Update the state
					}
				});

				return () => unsubscribe(); // Call firebase to when the user's state has changed
			} catch (e) {
				console.log(e);
			}
		}

		if (!isDone) {
			fetchUserAsync(); // Calls function once and would not call it more than once
		}
	}, [isDone]); // Check again after the user decides to log out or log in

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
