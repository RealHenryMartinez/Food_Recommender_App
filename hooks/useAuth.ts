import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { USER_URI } from "../util/constants";

// Interface structure for the properties of the selected image element that can be used 
interface ISelectedImage {
	uri: string;
	name: string | null | undefined;
	type: string;
}
// User interface for the uploading of the selected iamge
interface IUserInfo {
	email: Required<string>;
	password: Required<string>;
	firstName: Required<string>;
	lastName: Required<string>;
	profileImage: Required<ISelectedImage>;
}

export default function useAuth() {
	let [selectedImage, setSelectedImage] = useState<ISelectedImage>({
		uri: "",
		name: "",
		type: "",
	});
	let [userInfo, setUserInfo] = useState<IUserInfo>({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		profileImage: selectedImage,
	});

	let openImagePickerAsync = async (): Promise<void> => {
		// Ask user to allow the use of the image picker
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}
		// After the permissions are granted, then we want to launch the camera roll
		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (pickerResult.canceled === true) { // if the camera roll is cancelled, then we want to opt out of the camera roll and return nothing else
			return;
		}
		// If the camera roll is not cancelled, then we would get our results of the image selection
		setSelectedImage({
			uri: pickerResult.assets[0].uri,
			name: pickerResult.assets[0].fileName,
			type: "image/png",
		});
	};
	// Create the user in our server
	// Used to send data via a form data request for the use of the file system in our server
	async function upload() {
		try {
			const data: any = new FormData();
			// form data is used to upload the file to the server and along with other user information to only use one request
			data.append("image", selectedImage);
			data.append("email", userInfo.email);
			data.append("password", userInfo.password);
			data.append("firstName", userInfo.firstName);
			data.append("lastName", userInfo.lastName);
			await axios.post(USER_URI, {
				data: data,
			});
		} catch (error) {
			console.log(error);
		}
	}
	return {
		openImagePickerAsync,
		selectedImage,
		upload,
	};
}
