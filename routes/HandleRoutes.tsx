import React from "react";
import { userInformationState } from "../store/AuthSlices/useAuthSlice";
import { useAppSelector } from "../store/Features/hook";
import AuthRoutes from "./AuthRoutes";
import SignedInRoutes from "./SignedInRoutes";

const HandleRoutes = () => {
	const userInfo = useAppSelector(userInformationState);

	switch (userInfo.loggedIn) {
		case true:
			return (
				<>
					<SignedInRoutes />
				</>
			);
		case false:
			return (
				<>
					<AuthRoutes />
				</>
			);
	}
};
export default HandleRoutes;
