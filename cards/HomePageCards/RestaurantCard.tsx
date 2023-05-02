import React from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

const CardContainer = styled.View`
	width: 225px;
	height: 205px;
	padding: 5%;
	margin-left: 10px;
	border-radius: 5px;
	background-color: #fff;

	shadow-color: #171717;
	shadow-offset: -5px 5px;
	shadow-opacity: 0.1;
	shadow-radius: 5px;
`;
const CardImage = styled.Image`
	width: 100%;
	height: 125px;
	object-fit: cover;
`;
const CardText = styled.Text`
	font-size: 15px;
	font-weight: 500;
`;
const CardRating = styled.Text``;
const RatingContainer = styled.View`
	flex-direction: row;
`;
interface IRestaurantDetails {
	name: string;
	image_url: string;
	rating: number;
}
interface IRestaurant {
	restaurantInfo: IRestaurantDetails;
}

const RestaurantCard = (props:IRestaurant) => {
	const { restaurantInfo } = props;
	return (
		<>
			<CardContainer>
				<CardImage source={{ uri: restaurantInfo.image_url }} />
				<CardText>{restaurantInfo.name}</CardText>
				<RatingContainer>
					<AntDesign name="star" size={24} color="#f2d43a" />
					<CardRating>{restaurantInfo.rating}</CardRating>
				</RatingContainer>
			</CardContainer>
		</>
	);
};

export default RestaurantCard;
