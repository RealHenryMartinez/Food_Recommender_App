import React from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";

const presetImage: string = require("../../assets/previewIcon.png");


const ImageUploader = styled.TouchableOpacity`
	width: 50%;
	height: 100%;
	border-radius: 50px;
	align-items: center;
	justify-content: center;
`;
const ImagePreview = styled.Image`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-width: 3px;
	border-radius: 50px;
	background-color: #fffaeb;
	border-color: #615a47;
	position: relative;
`;
const ImageFilter = styled.Image`
	position: absolute;
	width: 50%;
	height: 75%;
	object-fit: contain;
	opacity: 0.25;
`;

const ImageContainer = styled.View`
	align-items: center;
    flex: 0.30;
`;

export default function ProfileSelection() {
	const { openImagePickerAsync, selectedImage } = useAuth(); // functions for getting the user's image permission and selected image

	// Image selected by the user
	const image: string = selectedImage.uri;
	return (
		<ImageContainer>
			<ImageUploader onPress={openImagePickerAsync}>
				<>
					<ImagePreview
						source={
							// check if there is an image already selected
							image == "" ? null : { uri: selectedImage.uri }
						}
					/>

					<ImageFilter source={presetImage} />
				</>
			</ImageUploader>
		</ImageContainer>
	);
}
