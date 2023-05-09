import React, { useState } from "react";
import useFirebase from "../hooks/useFirebase";
import styled from "styled-components/native";
import { useAppSelector } from "../store/Features/hook";
import { userInformationState } from "../store/AuthSlices/useAuthSlice";
import { Modal } from "react-native";
import ProfileSelection from "../components/AuthComponents/ProfileSelection";

const Container = styled.View`
	flex: 1;
	background-color: #fff;
`;

const Header = styled.View`
	background-color: #ff4049;
	height: 45%;
	justify-content: center;
	align-items: center;
`;

const Avatar = styled.Image`
	width: 100px;
	height: 100px;
	border-radius: 50px;
	margin-top: 15%;
`;

const Username = styled.Text`
	color: #fff;
	font-size: 24px;
	margin-top: 5%;
`;

const Content = styled.View`
	flex: 1;
	padding: 16px;
`;

const Label = styled.Text`
	font-size: 16px;
	font-weight: bold;
	margin-top: 16px;
`;

const Value = styled.Text`
	font-size: 16px;
	margin-top: 8px;
`;

const LogOutContainer = styled.View`
	padding: 5%;
	margin-top: 20%;
	background-color: #fafafa;
`;
const LogOutButton = styled.TouchableOpacity`
	padding: 5%;
	background-color: #ff4049;
	border-radius: 15px;
	margin-right: 50%;
`;
const LogOutText = styled.Text`
	font-size: 15px;
	color: #fff;
	font-weight: 600;
	text-align: center;
`;
const PageContainer = styled.View`
	flex: 1;
	background-color: #fff;
`;

const ProfileButton = styled.TouchableOpacity`
	background-color: #ff4049;
	width: 55%;
	height: 10%;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-left: 5%;
	padding: 5%;
`;

const ProfileButtonText = styled.Text`
	color: white;
	font-weight: bold;
	font-size: 16px;
`;

const UploadModal = styled.View`
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	flex: 1;
`;

const UploadModalTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
	margin-top: 15%;
`;

const UploadModalButton = styled.TouchableOpacity`
	background-color: #ff4049;
	padding: 5%;
	border-radius: 8px;
	margin-bottom: 25%;
`;

const UploadModalButtonText = styled.Text`
	color: white;
	font-weight: bold;
	text-align: center;
`;
const UploadModalContainer = styled.View`
	flex: 1;
`;

// Create profile Page
const ProfilePage = () => {
	const { handleSignOutUser } = useFirebase();
	const currentUser = useAppSelector(userInformationState);
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const toUpper = <T extends string>(userInfo: T): string => {
		// We return a string so we can access the string's functions
		return (
			userInfo.substring(0, 1).toUpperCase() +
			userInfo.substring(1, userInfo.length)
		);
	};
	const firstName = toUpper<string>(currentUser.firstName);
	const lastName = toUpper<string>(currentUser.lastName);
	return (
		<PageContainer>
			<Container>
				<Header>
					<Avatar source={{ uri: currentUser.profileImage }} />
					<Username>{firstName + " " + lastName}</Username>
				</Header>
				<Content>
					<Label>Email:</Label>
					<Value>{currentUser.email}</Value>
				</Content>
			</Container>
			<ProfileButton onPress={toggleModal}>
				<ProfileButtonText>Upload Profile Image</ProfileButtonText>
			</ProfileButton>
			<Modal
				visible={isModalVisible}
				onRequestClose={toggleModal}
				animationType="slide"
			>
				<UploadModal>
					<UploadModalTitle>Upload a profile image</UploadModalTitle>
					{/* Here is where the user would upload their profile to the server */}
					<UploadModalContainer>
						<ProfileSelection />
					</UploadModalContainer>

					<UploadModalButton onPress={toggleModal}>
						<UploadModalButtonText>Cancel</UploadModalButtonText>
					</UploadModalButton>
				</UploadModal>
			</Modal>
			<LogOutContainer>
				<LogOutButton onPress={handleSignOutUser}>
					<LogOutText>Log Out</LogOutText>
				</LogOutButton>
			</LogOutContainer>
		</PageContainer>
	);
};

export default ProfilePage;
