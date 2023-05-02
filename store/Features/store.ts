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

// Export some helper types used to improve type-checking
/**
 * typeof: Returns the type of the action object passed being the dispatch and selector
 */
export type AppDispatch = typeof store.dispatch;  // function type
export type RootState = ReturnType<typeof store.getState>;