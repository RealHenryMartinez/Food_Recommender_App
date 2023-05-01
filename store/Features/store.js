/**
 * Purpose of store: Being used to store all of our global state
 */

import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import useBusinessSlice from '../HomePageSlices/useBusinessSlice'

export const store = configureStore({
  // function that receives the current state of the action object and decide when to update the userSession state
  // event listener that handles events based on the received action type
  reducer: {
    // copy the original state and assign changes to the copied values we chooose
    useBusinessSlice: useBusinessSlice
  },
  devTools: true,
})
