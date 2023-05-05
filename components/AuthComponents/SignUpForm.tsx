import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import TextInputComponent from "./TextInputComponent";
import ProfileSelection from "../AuthComponents/ProfileSelection";
import AuthHeader from "./AuthHeader";
import { KeyboardAvoidingView, Platform } from "react-native";
import useRoutes from "../../hooks/useRoutes";
import { IDispatchForm } from "../../interfaces/authInterface";
const InputContainer = styled.View`
	flex: 1;
`;
const TotalInputContainer = styled.FlatList`
	background-color: #fff;
`;
const SignUpContainer = styled.View`
	flex: 1;
	align-items: center;
`;
const SignUpButton = styled.TouchableOpacity``;
const SignUpButtonText = styled.Text`
	font-size: 20px;
	font-weight: 600;
	color: #fff;
`;
const SignUpView = styled.View`
	padding: 5% 20% 5% 20%;
	background-color: #ff4049;
	margin-bottom: 5%;
	border-radius: 10px;
`;

const NavigationContainer = styled.View`
	flex: 1;
	align-items: center;
	padding-bottom: 20%;
`;
const NavigationButton = styled.TouchableOpacity``;
const NavButtonText = styled.Text`
	font-size: 17px;
	color: #ff4049;
`;
const SignUpForm = () => {
	const { navigateTo } = useRoutes();
	// Used to set the state of our object properties of the user
	const { userInfoForm, setUserInfoForm } = useAuth();
	const createUser = setUserInfoForm as Dispatch<SetStateAction<IDispatchForm>>;
	// Containing all the input's placeholder values besides the value itself
	const placeholders: string[] = [
		"John",
		"Doe",
		"user0000@gmail.com",
		"Use more than 6 letters",
	];
	// Helps us with getting the keyboard to the right position when the user input is clicked
	const keyboardVerticalOffset = Platform.OS === "ios" ? 175 : 0;
	return (
		<KeyboardAvoidingView
			behavior="position"
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<TotalInputContainer
				ListHeaderComponent={
					<>
						<AuthHeader header="Sign Up Now" />
						<ProfileSelection />
					</>
				}
				ListFooterComponent={
					<>
						<SignUpContainer>
							<SignUpButton>
								<SignUpView>
									<SignUpButtonText>Sign Up</SignUpButtonText>
								</SignUpView>
							</SignUpButton>
						</SignUpContainer>
						<NavigationContainer>
							<NavigationButton
								onPress={() => navigateTo("Login")}
							>
								<NavButtonText>Go To Login</NavButtonText>
							</NavigationButton>
						</NavigationContainer>
					</>
				}
				data={Object.keys(userInfoForm)}
				renderItem={({ item, index }) => {
					console.log(userInfoForm[item]);

					return (
						<InputContainer key={index}>
							<TextInputComponent
								placeholder={placeholders[index]}
								setUser={createUser}
								user={userInfoForm}
								userKey={item}
							/>
						</InputContainer>
					);
				}}
			/>
		</KeyboardAvoidingView>
	);
};

export default SignUpForm;
