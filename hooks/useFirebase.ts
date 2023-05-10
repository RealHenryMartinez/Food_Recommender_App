import { signOut } from "firebase/auth";
import React from "react";
import { userLoggedOut } from "../store/AuthSlices/useAuthSlice";
import { useAppDispatch } from "../store/Features/hook";
import { auth } from "../util/firebaseConfig";

export default function useFirebase() {

    const dispatch = useAppDispatch();
	const createToken = async () => {
		let user = auth.currentUser;
		const token = user && (await user.getIdToken());
		const payloadHeader = {
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		};
		return await payloadHeader;
	};

    const handleSignOutUser = async () => {
        try {
          // change the state of the user screen to false to change the routes we want the user to access
          dispatch(userLoggedOut()) 
          const result = await signOut(auth) // Sign out the user from firebase authentication
          return result
        } catch (err) {
          console.log(err.message)
        }
      }
	
	return {
		createToken,
        handleSignOutUser
	};
}
