import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardContainer from "./CardContainer";
import Header from "./Header";
import SearchBar from "./SearchBar";
import HeaderBackground from "../../assets/bbqImage.png";
import useRestaurants from "../../hooks/useRestaurants";
import { Text } from "react-native";
import useSetBusiness from "../../hooks/useSetBusiness";
import { useAppSelector } from "../../store/Features/hook";
import { getTotalRestaurants } from "../../store/HomePageSlices/useBusinessSlice";
import RemainingRestaurants from "./RemainingRestaurants";

const SectionList = styled.FlatList``;
const HeaderContainer = styled.View`
	flex: 1;
`;
const BackgroundHeaderImage = styled.Image`
	width: 100%;
	height: 100%;
	padding-vertical: 10%;
	object-fit: cover;
	position: absolute;
	justify-content: center;
	align-items: center;
`;
const HeaderContent = styled.View`
	flex: none;
`;
const ContentListContainer = styled.View`
	flex: 2;
`;

const RestaurantSectionContainer = (props) => {
	const { isDone } = useRestaurants();
	const { categorySection } = props;
	const totalBusiness = useAppSelector(getTotalRestaurants);

	if (isDone) {
		return (
			<ContentListContainer>
				<SectionList
					ListHeaderComponent={
						<>
							<HeaderContainer>
								<BackgroundHeaderImage
									source={HeaderBackground}
								/>
								<HeaderContent>
									<SearchBar />
								</HeaderContent>
							</HeaderContainer>
							<Header />
						</>
					}
					ListFooterComponent={
						<>
							<RemainingRestaurants businesses={totalBusiness} />
						</>
					}
					showsVerticalScrollIndicator={false}
					data={categorySection}
					renderItem={({ item }) => (
						<>
							<CardContainer
								businesses={totalBusiness}
								section={item}
							/>
						</>
					)}
				/>
			</ContentListContainer>
		);
	} else {
		<>
			<Text>Loading Items...</Text>
		</>;
	}
};
export default RestaurantSectionContainer;
