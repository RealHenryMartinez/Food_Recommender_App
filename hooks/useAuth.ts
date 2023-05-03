import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { USER_URI } from "../util/constants";

interface ISelectedImage {
	uri: string;
	name: string | null | undefined;
	type: string;
}
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
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (pickerResult.canceled === true) {
			return;
		}

		setSelectedImage({
			uri: pickerResult.assets[0].uri,
			name: pickerResult.assets[0].fileName,
			type: "image/png",
		});
	};

	async function upload() {
		try {
			const data: any = new FormData();
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
