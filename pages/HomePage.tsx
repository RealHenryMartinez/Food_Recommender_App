import React from "react";
import styled from "styled-components";
import RestaurantSectionContainer from "../components/HomeComponents/RestaurantSectionContainer";

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
		<>
			<MainContainer>
				<ContentContainer>
					<RestaurantSectionContainer
						categorySection={sectionCategory}
					/>
				</ContentContainer>
			</MainContainer>
		</>
	);
};

export default HomePage;
