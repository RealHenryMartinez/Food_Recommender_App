import axios from "axios";
import { GET_USER_URI } from "../../util/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../Features/store";
import { auth } from "../../util/firebaseConfig";

export interface IUserCredentials {
	email: string;
	password: string;
}
export interface IUserInfo extends IUserCredentials {
	firstName: string;
	lastName: string;
}
export interface IUserState extends IUserInfo {
	profileImage: object;
	loggedIn: boolean;
}
function handleGetAsyncThunk(name: string, PARAMS: IUserCredentials | string) {
	const getRequest = createAsyncThunk(`useAuthSlice/${name}`, async () => {
		try {
			const response = await axios.get(GET_USER_URI + PARAMS);
			return response.data;
		} catch (err) {
			if (typeof err === "string") {
				err.toUpperCase(); // works, `e` narrowed to string
			} else if (err instanceof Error) {
				err.message; // works, `e` narrowed to Error
			}
		}
	});
	return getRequest;
}
// Params we set first to the request object
export let userParams: IUserCredentials | string = {
	password: "",
	email: "",
};
// our request object
export const getUser = handleGetAsyncThunk("getUser", userParams);
export const getAllUsers = handleGetAsyncThunk("getAllUsers", "/");

let users: Array<object> = [];
const initialState: IUserState = {
	firstName: "",
	lastName: "",
	profileImage: {},
	email: "",
	password: "",
	loggedIn: false,
};
export const useAuthSlice = createSlice({
	name: "useAuthSlice",
	initialState,
	reducers: {
		userFound: (state) => {
			state.loggedIn = true;
		},
		userLoggedOut: (state) => {
			state.loggedIn = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state, { payload }) => {
			console.log("pending");
		});
		builder.addCase(getUser.rejected, (state, { payload }) => {
			console.log("Rejected ");
		});
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.profileImage = payload.profileImage;
			state.email = payload.email;
			state.password = payload.password;
			state.loggedIn = true;
		});
		builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
			const userFound = payload.filter(
				(getOneUser) => getOneUser.email === auth.currentUser.email
			)[0];
			state.firstName = userFound.firstName;
			state.lastName = userFound.lastName;
			state.profileImage = userFound.profileUri;
			state.email = userFound.email;
			state.password = userFound.password;
			state.loggedIn = true;
			console.log("current user:", users);
		});
	},
});
export const { userFound, userLoggedOut } = useAuthSlice.actions;

export const userInformationState = (state: RootState) => state.useAuthSlice;
export default useAuthSlice.reducer;
