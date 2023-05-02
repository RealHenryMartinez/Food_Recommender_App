import React from "react";
import RestaurantCard from "../../cards/HomePageCards/RestaurantCard";
import styled from "styled-components";
import useSetBusiness from "../../hooks/useSetBusiness";
import { ListRenderItemInfo } from "react-native";

const Container = styled.View``;
const CardList = styled.FlatList`
	padding-vertical: 5%;
`;
const ContainerHeader = styled.Text`
	font-weight: 600;
	font-size: 20px;
`;
const HeaderContainer = styled.View`
	margin: 5%;
`;

// Setting up the schema structure that is used by the Yelp API service
interface ICategoryDetails {
	title: string;
}

interface IRestaurantDetail {
	categories: ICategoryDetails;
	// necessary because the restaurant details are supposed to be available
	name: string;
	image_url: string;
	rating: number;
};

interface ICardProps {
	business?: IRestaurantDetail[];
}
// Adding Section to Businesses property
interface ICategory extends ICardProps {
	section?: string;
}

export default function CardContainer({ section }: ICategory) {
	const { business } = useSetBusiness();
	// Passing in the array of business properties
	const filterBusinessBySection = (restaurantItem: ICardProps[]) => {
		let filteredBusiness;
		filteredBusiness = restaurantItem.filter((restaurant) => {
			for (let i = 0; i < restaurant["categories"].length; i++) {
				console.log(restaurant["categories"][i].title);
				if (restaurant["categories"][i].title === section) {
					return restaurant["categories"][i].title === section;
				}
			}
		});
		return filteredBusiness;
	};
	// Return a new array list of the business items
	const filter: ICardProps[] = filterBusinessBySection(business);
	return (
		<>
			<Container>
				<HeaderContainer>
					<ContainerHeader>{section}</ContainerHeader>
				</HeaderContainer>
				<CardList
					data={filter}
					horizontal
					decelerationRate={0}
					snapToInterval={225} //your element width
					snapToAlignment={"center"}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }:ListRenderItemInfo<IRestaurantDetail>) => {
						return <RestaurantCard restaurantInfo={item} />;
					}}
				/>
			</Container>
		</>
	);
}
