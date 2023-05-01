import React from "react";
import RestaurantCard from "../../cards/HomePageCards/RestaurantCard";
import styled from "styled-components";
import useSetBusiness from "../../hooks/useSetBusiness";

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

export default function CardContainer(props) {
	const { section, businesses } = props;
	const { business } = useSetBusiness();
	const filterBusinessBySection = businesses.filter((restaurant) => {
		for (let i = 0; i < restaurant.categories.length; i++) {
			console.log(restaurant.categories[i].title);
			if (restaurant.categories[i].title === section) {
				return restaurant.categories[i].title === section;
			}
		}
	});
	return (
		<>
			<Container>
				<HeaderContainer>
					<ContainerHeader>{section}</ContainerHeader>
				</HeaderContainer>
				<CardList
					data={filterBusinessBySection}
					horizontal
					decelerationRate={0}
					snapToInterval={225} //your element width
					snapToAlignment={"center"}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => {
						return <RestaurantCard restaurantInfo={item} />;
					}}
				/>
			</Container>
		</>
	);
}
