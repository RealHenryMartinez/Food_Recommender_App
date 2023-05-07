import React from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import useRoutes from "../../hooks/useRoutes";

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
	border-width: 5px;
	border-radius: 200px;
	background-color: #fffaeb;
	border-color: #ff4049;
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
	flex: 5;
	height: 200px;
`;
const ImageUploadButton = styled.TouchableOpacity`
	padding: 5%;
	background-color: red;
`;
const ButtonText = styled.Text`
	font-size: 15px;
`;

const SkipButtonText = styled.Text`
	font-size: 15px;
`;

const SkipButton = styled.TouchableOpacity`
	padding: 5%;
	background-color: blue;
`;
const SkipContainer = styled.View`
	align-items: center;
	flex: 2;
`;

export default function ProfileSelection() {
	const { navigateTo } = useRoutes();
	const { openImageLibrary, profileImage, uploadProfileImage, goToPhoto } =
		useAuth(); // functions for getting the user's image permission and selected image

	// Image selected by the user
	const image: string = profileImage;
	const uploadAndNavigate = () => {
		console.log("navigate to home");
		uploadProfileImage();
		// After user has logged in and successfully uploaded a valid profile image, they will navigate to home 
		//if (goToPhoto) {
			navigateTo("Home");
		//}
	};
	return (
		<>
			<ImageContainer>
				<ImageUploader onPress={openImageLibrary}>
					<>
						<ImagePreview
							source={
								// check if there is an image already selected
								image == "" ? null : { uri: profileImage }
							}
						/>

						<ImageFilter source={presetImage} />
					</>
				</ImageUploader>
			</ImageContainer>
			<ImageUploadButton disabled={goToPhoto} onPress={uploadAndNavigate}>
				<ButtonText>Upload</ButtonText>
			</ImageUploadButton>
			<SkipContainer>
				<SkipButton onPress={() => navigateTo("Home")}>
					<SkipButtonText>Skip</SkipButtonText>
				</SkipButton>
			</SkipContainer>
		</>
	);
}
