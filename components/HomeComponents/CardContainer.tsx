import React from "react";
import RestaurantCard from "../../cards/HomePageCards/RestaurantCard";
import styled from "styled-components";
import useSetBusiness from "../../hooks/useSetBusiness";
import { ListRenderItemInfo } from "react-native";
import {
	ICardProps,
	ICategory,
	IRestaurantDetail,
} from "../../interfaces/restaurantInterface";

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

export default function CardContainer({ categories }: ICategory) {
	const { business } = useSetBusiness();
	// Passing in the array of business properties
	const filterBusinessBySection = (
		restaurantItem: IRestaurantDetail[] | undefined
	) => {
		let filteredBusiness;
		filteredBusiness = restaurantItem?.filter((restaurant) => {
			for (
				let i = 0;
				i < Object.values(restaurant.categories).length;
				i++
			) {
				if (restaurant.categories[i].title === categories) {
					return restaurant.categories[i].title === categories;
				}
			}
		});
		return filteredBusiness;
	};
	// Return a new array list of the business items
	const filter: IRestaurantDetail[] = filterBusinessBySection(business);
	return (
		<>
			<Container>
				<HeaderContainer>
					<ContainerHeader>{categories}</ContainerHeader>
				</HeaderContainer>
				<CardList
					data={filter}
					horizontal
					decelerationRate={0}
					snapToInterval={225} //your element width
					snapToAlignment={"center"}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					renderItem={({
						item,
					}: ListRenderItemInfo<IRestaurantDetail>) => {
						return <RestaurantCard restaurantInfo={item} />;
					}}
				/>
			</Container>
		</>
	);
}
