import axios from "axios";
import {
	GET_CATEGORY_URI,
	GET_REQUEST_URI,
	YELP_URI,
} from "../../util/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../Features/store";
import { auth } from "../../util/firebaseConfig";
import { ICardProps } from "../../interfaces/restaurantInterface";

function handleGetAsyncThunk(name: string, ENDPOINT: string) {
	const getRequest = createAsyncThunk(
		`useBusinessSlice/${name}`,
		async () => {
			try {
				const response = await axios.get(YELP_URI + ENDPOINT);
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

export const getRestaurants = handleGetAsyncThunk(
	"getRestaurants",
	GET_REQUEST_URI
);

export const getCategories = handleGetAsyncThunk(
	"getCategories",
	GET_CATEGORY_URI
);


const initialState: ICardProps = {
	totalRestaurants: [],
	categories: [],
};
export const useBusinessSlice = createSlice({
	name: "restaurants",
	initialState,
	reducers: {
		addRestaurants: (state, { payload }) => {
			state.totalRestaurants = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getRestaurants.pending, (state, { payload }) => {
			console.log("pending");
		});
		builder.addCase(getRestaurants.rejected, (state, { payload }) => {
			console.log("Rejected ");
		});
		builder.addCase(getRestaurants.fulfilled, (state, { payload }) => {
			if(auth){
				state.totalRestaurants = payload.businesses;
				// Create categories based on the restaurants gathered from the database
				state.categories = state.totalRestaurants.map((restaurant) => restaurant.categories).flat().filter(
					(thing, index, self) =>
					  index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(thing))
				  );
				//   console.log('categories: ', state.categories);
			}
		});

		builder.addCase(getCategories.pending, (state, { payload }) => {
			console.log("pending");
		});
		builder.addCase(getCategories.rejected, (state, { payload }) => {
			console.log("Rejected ");
		});
		builder.addCase(getCategories.fulfilled, (state, { payload }) => {
			state.categories = payload;
		});
	},
});
export const getTotalRestaurants =(state:RootState) =>
	state.useBusinessSlice.totalRestaurants;
export const getTotalCategories = (state:RootState) =>
	state.useBusinessSlice.categories;
export default useBusinessSlice.reducer;
