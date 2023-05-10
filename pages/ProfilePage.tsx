import React from "react";
import styled from "styled-components";
import useFirebase from "../hooks/useFirebase";

const LogOutContainer = styled.View`
    padding: 5%;
    margin-top: 20%;
    background-color: #dcdee0;
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
const ProfilePage = () => {
	const { handleSignOutUser } = useFirebase();
	return (
		<PageContainer>
            
			<LogOutContainer>
				<LogOutButton onPress={handleSignOutUser}>
					<LogOutText>Log Out</LogOutText>
				</LogOutButton>
			</LogOutContainer>
		</PageContainer>
	);
};

export default ProfilePage;
