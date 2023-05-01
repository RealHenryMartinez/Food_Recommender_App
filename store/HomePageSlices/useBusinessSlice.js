import axios from 'axios'
import {GET_CATEGORY_URI, GET_REQUEST_URI, YELP_URI } from '../../util/constants'
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'


function handleGetAsyncThunk(name, ENDPOINT) {
  const getRequest = createAsyncThunk(
    `useBusinessSlice/${name}`,
    async () => {
      try {
        const response = await axios.get(YELP_URI + ENDPOINT)
        return response.data
      } catch (err) {
        if (!err.response) {
          console.log('error: ', err)
          console.log(err.response)
          throw err
        }
      }
    },
  )
  return getRequest;
}

export const getRestaurants = handleGetAsyncThunk('getRestaurants', GET_REQUEST_URI);

export const getCategories = handleGetAsyncThunk('getCategories', GET_CATEGORY_URI);


const initialState = {
  totalRestaurants: [],
  categories: [],
}
export const useBusinessSlice = createSlice({
  name: 'restaurants',
  initialState,
    reducers: {
        addRestaurants: (state, { payload }) => {
            state.totalRestaurants = payload
          },
    },
  extraReducers: (builder) => {
    builder.addCase(getRestaurants.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(getRestaurants.rejected, (state, { payload }) => {
      console.log('Rejected ')
    })
    builder.addCase(getRestaurants.fulfilled, (state, { payload }) => {
      state.totalRestaurants = payload.businesses;
    })

    builder.addCase(getCategories.pending, (state, { payload }) => {
      console.log('pending')
    })
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      console.log('Rejected ')
    })
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    })
  },
})
export const getTotalRestaurants = (state) => state.useBusinessSlice.totalRestaurants;
export const getTotalCategories = (state) => state.useBusinessSlice.categories;
export default useBusinessSlice.reducer
