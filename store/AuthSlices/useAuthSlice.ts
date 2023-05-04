import axios from "axios";
import { GET_USER_URI } from "../../util/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../Features/store";

export interface IUserCredentials {
	email: string;
	password: string;
}
export interface IUserInfo extends IUserCredentials {
	firstName: string;
	lastName: string;
	profileImage: object;
	loggedIn: boolean;
}
function handleGetAsyncThunk(name: string, PARAMS: IUserCredentials) {
	const getRequest = createAsyncThunk(
		`useAuthSlice/${name}`,
		async () => {
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
		}
	);
	return getRequest;
}
// Params we set first to the request object
export let userParams: IUserCredentials = {
	password: "",
	email: "",
};
// our request object
export const getUser = handleGetAsyncThunk("getUser", userParams);

const initialState: IUserInfo = {
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
	reducers: {},
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
	},
});
export const userInformationState = (state: RootState) =>
	state.useAuthSlice;
export default useAuthSlice.reducer;
