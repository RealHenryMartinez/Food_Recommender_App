import { getRestaurants} from '../store/HomePageSlices/useBusinessSlice'
import { useAppDispatch } from '../store/Features/hook'
import { useState, useEffect } from 'react'
export default function useRestaurants() {
  const [isDone, setIsDone] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  
  async function getRestaurantsAsync (){
    try {
      // getting all the restaurants from the database
     
      //await dispatch(getRestaurants())
      //dispatch(getCategories());
      
    } catch (err) {
      console.log('Error fetching restaurants', err)
    }
  }
 
  useEffect(() => {
    async function fetchUserDataAsync() {
      // after user is confirmed, grab their data
      try {
        const restaurants = await getRestaurantsAsync()
        setIsDone(true)
        return restaurants;
      } catch (e) {
        console.log(e)
      }
    }
    fetchUserDataAsync()
  }, [])
  return {
    isDone,
  }
}