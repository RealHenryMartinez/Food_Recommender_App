import React, {useState} from 'react'
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import useFirebase from './useFirebase';
import {USER_URI} from "../util/constants";

const usePhotoHandler = () => {
    const [profileImage, setProfileImage] = useState("");
    const { createToken } = useFirebase();
    const openImageLibrary = async () => {
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

	const imageObj = {
		name: `${new Date()}_profile`,
		uri: profileImage,
		type: "image/jpg",
	};
	const uploadProfileImage = async () => {
		const formData = new FormData();
		formData.append("profile", JSON.parse(JSON.stringify(imageObj)));
		const headerAuth = await createToken();
		try {
			await axios.post(
				USER_URI + "/uploadProfileImage",
				formData,
				headerAuth
			);
		} catch (error) {
			console.log(error.message);
		}
	};
  
    return {
        uploadProfileImage,
        openImageLibrary,
        profileImage
    }
}

export default usePhotoHandler