// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getRestaurantsByCategory } from '../api/restaurants';

// interface RestaurantsState {
//   data: Restaurant[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: RestaurantsState = {
//   data: [],
//   isLoading: false,
//   error: null,
// };

// export const fetchRestaurantsByCategory = createAsyncThunk(
//   'restaurants/fetchByCategory',
//   async (category: string) => {
//     const response = await getRestaurantsByCategory(category);
//     return response.data;
//   }
// );

// const restaurantsSlice = createSlice({
//   name: 'restaurants',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRestaurantsByCategory.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchRestaurantsByCategory.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchRestaurantsByCategory.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message ?? 'Failed to fetch restaurants';
//       });
//   },
// });

// export default restaurantsSlice.reducer;