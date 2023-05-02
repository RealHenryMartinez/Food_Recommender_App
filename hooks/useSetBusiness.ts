import { useEffect, useState } from "react";
import { getTotalRestaurants } from "../store/HomePageSlices/useBusinessSlice";
import { useAppSelector } from "../store/Features/hook";
/**
 * Returns the list of businesses and the filtered businesses that match the filter criteria.
 * 
 * @returns business and trending business
 */
export default function useSetBusiness() {
 const getBusinesses = useAppSelector(getTotalRestaurants);
//  const cloneData = JSON.parse(JSON.stringify(getBusinesses))
  const [business, setBusinesss] = useState(getBusinesses)

  return {
    business
  };
}
