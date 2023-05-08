import React from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import usePhotoHandler from "../../hooks/usePhotoHandler";
import useRoutes from "../../hooks/useRoutes";

const presetImage: string = require("../../assets/previewIcon.png");

const ImageFilter = styled.Image`
	position: absolute;
	width: 50%;
	height: 75%;
	object-fit: contain;
	opacity: 0.25;
`;

const SkipButtonText = styled.Text`
	font-size: 15px;
	color: #ff4049;
`;
const SkipContainer = styled.View`
	margin-top: 2%;
`;

const avatar = require("../../assets/splash.png");

const Container = styled.View`
	flex: 5;
	justify-content: center;
	align-items: center;
`;

const AvatarContainer = styled.TouchableOpacity`
	width: 150px;
	height: 150px;
	border-radius: 75px;
	border: 5px solid #dcdee0;
	justify-content: center;
	align-items: center;
`;

const Avatar = styled.Image`
	width: 150px;
	height: 150px;
	border-radius: 75px;
`;

const UploadButton = styled.TouchableOpacity`
	margin-top: 20px;
	padding: 10px 20px;
	background-color: #ff4049;
	border-radius: 5px;
`;

const ButtonText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: bold;
`;

export default function ProfileSelection() {
	const { navigateTo } = useRoutes();
	const { goToPhoto } = useAuth(); // functions for getting the user's image permission and selected image
	const {openImageLibrary, profileImage, uploadProfileImage} = usePhotoHandler();
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
			<Container>
				<AvatarContainer onPress={openImageLibrary}>
					{avatar ? (
						<>
							<Avatar
								source={
									image == "" ? null : { uri: profileImage }
								}
							/>
							<ImageFilter source={presetImage} />
						</>
					) : (
						<ButtonText>Select an image</ButtonText>
					)}
				</AvatarContainer>
				<UploadButton disabled={goToPhoto} onPress={uploadAndNavigate}>
					<ButtonText>Upload</ButtonText>
				</UploadButton>
				<SkipContainer>
					<SkipButtonText onPress={() => navigateTo("Home")}>
						Skip
					</SkipButtonText>
				</SkipContainer>
			</Container>
		</>
	);
}
