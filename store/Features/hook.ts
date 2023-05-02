/**
 * Purpose of File: Make it easier to use the dispatch function without having to make a function for every dispatch
 * Shortcut for useSelector
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

// It enables to use any action towards the store by adding the action as an argument to the dispatch variable
type DispatchFunc = () => AppDispatch // create a new type
// give the type of AppDispatch to the dispatch function
export const useAppDispatch: DispatchFunc = useDispatch

// gets to the redux store -> runs the function in the store -> after each dispatch, rerender the component based on the updated values that the state has
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // use redux built in selector type for the useSelector
