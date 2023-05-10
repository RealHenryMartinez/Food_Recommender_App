import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components";
import SignUpForm from "../components/AuthComponents/SignUpForm";

const headerImage: string = require("../assets/peopleEatingHeader.png");

const PageContainer = styled.View`
	background-color: #fff;
	position: relative;
	border-radius: 20px;
	flex: 1;
	padding-top: 5%;
	margin-top: -5%;
	shadow-color: #171717;
	shadow-offset: 0px -10px;
	shadow-opacity: 0.5;
	shadow-radius: 15px;
`;
const HeaderContainer = styled.View`
	flex: 0.4;
`;
const HeaderImage = styled.Image`
	width: 100%;
	height: 100%;
`;
const MainContainer = styled.View`
	flex: 1;
`;
export default function SignUpPage() {
	return (
		<MainContainer>
			<HeaderContainer>
				<HeaderImage source={headerImage} />
			</HeaderContainer>

			<PageContainer>
				<SignUpForm />
				
				<StatusBar
					animated={true}
					backgroundColor="#61dafb"
					barStyle={"dark-content"}
					showHideTransition={"fade"}
					hidden={false}
				/>
				
			</PageContainer>


		</MainContainer>
	);
}
