import React from "react";
import { Text } from "react-native";
import useAuth from "../hooks/useAuth";
import { userInformationState } from "../store/AuthSlices/useAuthSlice";
import { useAppSelector } from "../store/Features/hook";
import AuthRoutes from "./AuthRoutes";
import SignedInRoutes from "./SignedInRoutes";

const HandleRoutes = () => {
	const userInfo = useAppSelector(userInformationState);
	const { isDone } = useAuth(); // Checking if the user has received the data
	if (isDone === true && userInfo.loggedIn == true || userInfo.loggedIn !== true) {
		// check if the user is logged in
		if (userInfo.loggedIn) {
			return (
				<>
					<SignedInRoutes />
				</>
			);
		} else {
			return (
				<>
					<AuthRoutes />
				</>
			);
		}
	} else {
		return (
			<>
				<Text>Grabbing User Data</Text>
			</>
		);
	}
};
export default HandleRoutes;
