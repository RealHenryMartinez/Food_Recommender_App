export interface ICategoryDetails {
	title: string;
}

export interface IRestaurantDetail {
	categories: ICategoryDetails;
	// necessary because the restaurant details are supposed to be available
	name: string;
	image_url: string;
	rating: number;
};

export interface ICardProps {
	totalRestaurants: IRestaurantDetail[];
    categories: Array<ICategoryDetails> ;
}
// Adding Section to Businesses property
export interface ICategory{
	categories: string | ICategoryDetails[];
}