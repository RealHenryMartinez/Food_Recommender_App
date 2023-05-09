import React from "react";
import styled from "styled-components";
import RestaurantSectionContainer from "../components/HomeComponents/RestaurantSectionContainer";
import { useAppSelector } from "../store/Features/hook";
import { getTotalCategories } from "../store/HomePageSlices/useBusinessSlice";

const MainContainer = styled.View`
	background-color: #fff;
	flex: 1;
`;
const ContentContainer = styled.View`
	flex: 2;
`;

const HomePage = () => {
	return (
		<>
			<MainContainer>
				<ContentContainer>
					<RestaurantSectionContainer
					/>
				</ContentContainer>
			</MainContainer>
		</>
	);
};

export default HomePage;
