import React from "react";
import ProfileSelection from "../components/AuthComponents/ProfileSelection";
import styled from "styled-components";

const PageContainer = styled.View`
	flex: 1;
	background-color: #fff;
`;
const PageHeader = styled.Text`
	font-size: 15px;
	font-weight: 600;
	font-size: 25px;
	color: #fff;
`;
const HeaderContainer = styled.View`
	align-items: center;
	padding-top: 25%;
	padding-bottom: 15%;
	flex: 0.25;
	background-color: #ff4049;
`;

const ChoosePhoto = () => {
	return (
		<PageContainer>
			<HeaderContainer>
				<PageHeader>Upload a Profile</PageHeader>
			</HeaderContainer>

			<ProfileSelection />
		</PageContainer>
	);
};

export default ChoosePhoto;
