import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ICredentials, IDispatchForm, IUserState } from "../../interfaces/authInterface";

const FormInput = styled.TextInput`
	padding: 5%;
	border-radius: 10px;
	background-color: #fff;
	margin: 5%;
	margin-bottom: 10%;
	flex: 1;

	shadow-color: #171717;
	shadow-offset: 0px -2px;
	shadow-opacity: 0.25;
	shadow-radius: 4px;
`;
const FormHeader = styled.Text`
	margin-left: 10%;
`;
const FormHeaderText = styled.Text`
	font-size: 15px;
	font-weight: 500;
`;

interface IForm {
	// Our setter method for the form and passing in as a functional interface to accept the form and return the new state
	setUser: Dispatch<SetStateAction<IDispatchForm>>;
	user: object;
	userKey: string;
	placeholder: string;
}
/**
 *
 * @param props - Property of the form state object
 * @returns a text input with placeholder
 */
export default function TextInputComponent(props: IForm) {
	const { user, setUser, placeholder, userKey } = props;
	const handleChange = (textInput: string, userKey: string) => {
		// Making sure that the parameters passed to the form are valid inputs whether the user is logging in or creating a new user
		setUser((currState: IUserState | ICredentials) => ({
			...currState,
			[userKey]: textInput,
		})); // changing the form state, but not outputting the user data
	};
	// Format input headers
	const formattedHeader = userKey
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
		.trim();
	return (
		<>
			<FormHeader>
				<FormHeaderText>
					{formattedHeader.substring(0, 1).toUpperCase() +
						formattedHeader.substring(1)}
				</FormHeaderText>
			</FormHeader>

			<FormInput
				placeholder={placeholder}
				onChangeText={(text) => handleChange(text.toString(), userKey)}
				value={user[userKey]}
			/>
		</>
	);
}
