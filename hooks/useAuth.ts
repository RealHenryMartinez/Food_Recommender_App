import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { useAppDispatch } from "../store/Features/hook";
import axios from "axios";
import { CREATE_USER_ENDPOINT, USER_URI } from "../util/constants";
import { ICredentials, IUserState } from "../interfaces/authInterface";
import {
	getAllUsers,
	userFound,
	userLoggedOut,
} from "../store/AuthSlices/useAuthSlice";
import useFirebase from "./useFirebase";
// Interface structure for the properties of the selected image element that can be used
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
	// The URI of the image would be stored here
	let [profileImage, setProfileImage] = useState("");
	const [goToPhoto, setGoToPhoto] = useState<boolean>(false);
	const [isDone, setIsDone] = useState(false); // runs when the authentication has been initialized whether a user is authenticated or not

	const { createToken } = useFirebase(); // runs when the authentication has been initialized and for the headers of our request

	const dispatch = useAppDispatch();
	const openImageLibrary = async () => {
		// Ask user for permission to open the gallery on the device
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!");
		}

		if (status === "granted") {
			const response = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
			});

			if (!response.canceled) {
				setProfileImage(response.assets[0].uri);
			}
		}
	};
	// Format of the image data
	let imageObj = {
		name: `${new Date()}_profile`,
		uri: profileImage,
		type: "image/jpg",
	};
	const uploadProfileImage = async () => {
		let formData = new FormData(); // Using form data it allows us to use the file uploading functionality
		formData.append("profile", JSON.parse(JSON.stringify(imageObj))); // Create a new key and assign it the value of the file and parse it into json
		const headerAuth = await createToken(); // Allowed the user that is logged in to access the profile upload request
		try {
			axios.post(USER_URI + "/uploadProfileImage", formData, headerAuth);
		} catch (error) {
			console.log(error.message);
		}
	};
	// // Create the user in our server
	// // Used to send data via a form data request for the use of the file system in our server
	const createUser = async (): Promise<void> => {
		try {
			axios
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
		} catch (err) {
			alert("Error creating user");
		}
	};
	const signUserIn = () => {
		let userAuth: ICredentials = {
			email: userLoginForm.email,
			password: userLoginForm.password,
		};
		//setUserInfoForm(userAuth)
		signInWithEmailAndPassword(auth, userAuth.email, userAuth.password)
			// takes in the credentials from email and password
			.then((userCredential) => {
				console.log("Signed In");
				// set the user as a variable
				const user = userCredential.user;
				return user;
			})
			.catch((err) => {
				alert(err.message);
			});
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
			// after user is confirmed, grab their data and any other associated data with the user
			try {
				await getLoggedInUserData();
				dispatch(userFound()); // Change the page to the logged in user
			} catch (e) {
				console.log(e);
			}
		}
		/**
		 * checkiing if the user is authenticated in firebase, and if so, then fetch the data of the user from our database
		 */
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
				fetchUserAsync();
				setIsDone(true);
			} else {
				// User is signed out
				dispatch(userLoggedOut());
				setIsDone(true);
			}
		});
	}, [user]);

	return {
		goToPhoto,
		isDone,
		openImageLibrary,
		profileImage,
		setUserInfoForm,
		userInfoForm,
		uploadProfileImage,
		createUser,
		userLoginForm,
		setUserLoginForm,
		signUserIn,
	};
}
