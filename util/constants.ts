import { IPen0 } from "./constantsIgnore";

export const MAIN_URI: string = `http://${IPen0}:4020`;

export const USER_URI: string = `http://${IPen0}:4020/user`;
// routes 
export const YELP_URI: string = MAIN_URI + `/restaurant`;

// Rest reponses 
export const GET_REQUEST_URI: string = "/getRestaurants";

export const GET_CATEGORY_URI: string = "/getCategories";
