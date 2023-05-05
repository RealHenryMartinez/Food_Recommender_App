import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import TextInputComponent from "./TextInputComponent";
import AuthHeader from "./AuthHeader";
import { KeyboardAvoidingView, Platform } from "react-native";
import useRoutes from "../../hooks/useRoutes";
import { IDispatchForm } from "../../interfaces/authInterface";
const InputContainer = styled.View`
	flex: 1;
`;
const TotalInputContainer = styled.FlatList`
	background-color: #fff;
  padding-top: 5%;
	margin-top: -5%;
  border-radius: 20px;
	shadow-color: #171717;
	shadow-offset: 0px -10px;
	shadow-opacity: 0.5;
	shadow-radius: 15px;
`;
const LoginContainer = styled.View`
	flex: 1;
	align-items: center;
`;
const LoginButton = styled.TouchableOpacity``;
const LoginButtonText = styled.Text`
	font-size: 20px;
	font-weight: 600;
	color: #fff;
`;
const LoginView = styled.View`
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

export default function LoginForm() {
  const { navigateTo } = useRoutes();
  const { userLoginForm, setUserLoginForm} = useAuth();
  const logInUser = setUserLoginForm as Dispatch<SetStateAction<IDispatchForm>>;
	// Containing all the input's placeholder values besides the value itself
	const placeholders: string[] = [
		"user0000@gmail.com",
		"Use more than 6 letters",
	];
	// Helps us with getting the keyboard to the right position when the user input is clicked
	const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
	return (
		<KeyboardAvoidingView
			behavior="position"
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<TotalInputContainer
				ListHeaderComponent={
					<>
						<AuthHeader header="Log in to Account" />
					</>
				}
				ListFooterComponent={
					<>
						<LoginContainer>
							<LoginButton>
								<LoginView>
									<LoginButtonText>Login</LoginButtonText>
								</LoginView>
							</LoginButton>
						</LoginContainer>
						<NavigationContainer>
							<NavigationButton
								onPress={() => navigateTo("Register")}
							>
								<NavButtonText>Create a new account</NavButtonText>
							</NavigationButton>
						</NavigationContainer>
					</>
				}
				data={Object.keys(userLoginForm)}
				renderItem={({ item, index }) => {
					console.log(userLoginForm[item]);

					return (
						<InputContainer key={index}>
							<TextInputComponent
								placeholder={placeholders[index]}
								setUser={logInUser}
								user={userLoginForm}
								userKey={item}
							/>
						</InputContainer>
					);
				}}
			/>
		</KeyboardAvoidingView>
	);
}