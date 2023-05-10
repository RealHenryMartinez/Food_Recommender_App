import React, { useState } from "react";
import useFirebase from "../hooks/useFirebase";
import styled from "styled-components/native";
import { useAppSelector } from "../store/Features/hook";
import { userInformationState } from "../store/AuthSlices/useAuthSlice";
import { Modal } from "react-native";
import ProfileSelection from "../components/AuthComponents/ProfileSelection";
const PageContainer = styled.View`
	flex: 1;
	background-color: #f5f5f5;
`;

const ProfileContainer = styled.View`
	padding: 20px;
	background-color: #fff;
	flex: 1;
	padding-top: 25%;
`;

const HeaderContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

const ProfileImage = styled.Image`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	margin-right: 10px;
`;

const UsernameText = styled.Text`
	font-size: 18px;
	font-weight: bold;
`;

const UserInformationContainer = styled.View`
	margin-top: 20px;
`;

const UserInformationRow = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
`;

const UserInformationLabel = styled.Text`
	font-size: 16px;
	font-weight: bold;
	margin-right: 10px;
`;

const UserInformationValue = styled.Text`
	font-size: 16px;
	flex: 1;
`;

const UploadModal = styled.View`
	background-color: #fff;
	padding: 20px;
	margin: 20px;
	flex: 1;
`;

const UploadModalTitle = styled.Text`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 20px;
	margin-top: 10%;
`;

const UploadModalContainer = styled.View`
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	flex: 1;
`;

const UploadModalButton = styled.TouchableOpacity`
	background-color: #ff4049;
	padding: 20px;
	align-items: center;
	border-radius: 5px;
	margin-bottom: 5%;
`;

const UploadModalButtonText = styled.Text`
	font-size: 16px;
	font-weight: bold;
	color: #fff;
`;

const ButtonContainer = styled.View`
	flex: 1;
	padding: 32px;
`;

const LogoutButton = styled.TouchableOpacity`
	background-color: #fafafa;
	border-width: 1px;
	border-color: #ff4049;
	border-radius: 5px;
	width: 100%;
	height: 50px;
	justify-content: center;
	align-items: center;
`;

const LogoutButtonText = styled.Text`
	color: #ff4049;
	font-size: 16px;
	font-weight: bold;
`;

const ProfilePage = () => {
	const { handleSignOutUser } = useFirebase();
	const currentUser = useAppSelector(userInformationState);
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const toUpper = <T extends string>(userInfo: T): string => {
		return (
			userInfo.substring(0, 1).toUpperCase() +
			userInfo.substring(1, userInfo.length)
		);
	};

	const firstName = toUpper<string>(currentUser.firstName);
	const lastName = toUpper<string>(currentUser.lastName);

	return (
		<PageContainer>
			<ProfileContainer>
				<HeaderContainer>
					<ProfileImage source={{ uri: currentUser.profileImage }} />
					<UsernameText>{firstName + " " + lastName}</UsernameText>
				</HeaderContainer>
				<UserInformationContainer>
					<UserInformationRow>
						<UserInformationLabel>Email:</UserInformationLabel>
						<UserInformationValue>
							{currentUser.email}
						</UserInformationValue>
					</UserInformationRow>
				</UserInformationContainer>
				<ButtonContainer>
					<UploadModalButton onPress={toggleModal}>
						<UploadModalButtonText>
							Upload Profile Image
						</UploadModalButtonText>
					</UploadModalButton>
					<LogoutButton onPress={handleSignOutUser}>
						<LogoutButtonText>Log Out</LogoutButtonText>
					</LogoutButton>
				</ButtonContainer>
				<Modal
					visible={isModalVisible}
					onRequestClose={toggleModal}
					animationType="slide"
				>
					<UploadModal>
						<UploadModalTitle>
							Upload a profile image
						</UploadModalTitle>
						{/* Here is where the user would upload their profile to the server */}
						<UploadModalContainer>
							<ProfileSelection />
						</UploadModalContainer>
						<UploadModalButton onPress={toggleModal}>
							<UploadModalButtonText>
								Cancel
							</UploadModalButtonText>
						</UploadModalButton>
					</UploadModal>
				</Modal>
			</ProfileContainer>
		</PageContainer>
	);
};

export default ProfilePage;
