import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components/native";
import CardContainer from "./CardContainer";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { Text } from "react-native";
import useSetBusiness from "../../hooks/useSetBusiness";
import { useAppSelector } from "../../store/Features/hook";
import {
	getTotalCategories,
	getTotalRestaurants,
} from "../../store/HomePageSlices/useBusinessSlice";
import RemainingRestaurants from "./RemainingRestaurants";
import { ListRenderItemInfo, VirtualizedList } from "react-native";
import {
	ICategory,
	ICategoryDetails,
} from "../../interfaces/restaurantInterface";
import useAuth from "../../hooks/useAuth";
import useRestaurants from "../../hooks/useRestaurants";

const SectionList = styled(VirtualizedList)``;
const HeaderContainer = styled.View`
	/* Set the height of the container to ensure it doesn't squish */
	height: 200px;
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

const RestaurantSectionContainer = () => {
	const HeaderBackground = require("../../assets/bbqImage.png");

	// Get categories from the Redux store
	const getCategories = useAppSelector(getTotalCategories);

	// Memoize categories so that it doesn't re-render unnecessarily
	const memoizedCategories = useMemo(() => {
		return getCategories;
	}, [getCategories]); // Detect categorized restaurant changes

	// Get total businesses from the Redux store
	const totalBusiness = useAppSelector(getTotalRestaurants);

	// Get isDone state from custom hook useRestaurants
	const { isDone } = useRestaurants();

	// If the content is done loading, render the content
	if (isDone) {
		return (
			<>
				<ContentListContainer>
					<SectionList
						ListHeaderComponent={
							<>
								<HeaderContainer>
									{/* Display header background image */}
									<BackgroundHeaderImage
										source={HeaderBackground}
									/>
									<HeaderContent>
										{/* Display search bar */}
										<SearchBar />
									</HeaderContent>
								</HeaderContainer>
								{/* Display header */}
								<Header />
							</>
						}
						ListFooterComponent={
							<>
								{/* <RemainingRestaurants businesses={totalBusiness} /> */}
							</>
						}
						showsVerticalScrollIndicator={false}
						data={memoizedCategories} // Use the memoized categories array
						keyExtractor={(item, index) => item.title}
						initialNumToRender={10}
						getItem={(data, index) => data[index]}
						getItemCount={(data) => data.length}
						renderItem={({
							item,
						}: ListRenderItemInfo<ICategoryDetails>) => (
							<>
								<CardContainer categories={item.title} />
							</>
						)}
					/>
				</ContentListContainer>
			</>
		);
	}
	// If the content is not done loading, display a loading message
	else {
		return (
			<>
				<Text>Loading Items...</Text>
			</>
		);
	}
};

export default RestaurantSectionContainer;
