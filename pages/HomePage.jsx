import React from "react";
import styled from "styled-components";
import RemainingRestaurants from "../components/HomeComponents/RemainingRestaurants";
import RestaurantSectionContainer from "../components/HomeComponents/RestaurantSectionContainer";
import useRestaurants from "../hooks/useRestaurants";

const MainContainer = styled.View`
	background-color: #fff;
	flex: 1;
`;
const ContentContainer = styled.View`
	flex: 2;
`;

const HomePage = () => {
	const sectionCategory = ["Bars", "Seafood"];
	return (
		<MainContainer>
			
			<ContentContainer>
				<RestaurantSectionContainer categorySection={sectionCategory}/>
			</ContentContainer>
			
		</MainContainer>
	);
};

export default HomePage;
