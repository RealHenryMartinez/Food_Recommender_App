import styled from "styled-components";

const CardImage = styled.Image`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
const RatingContainer = styled.View`
	flex: 1;
	flex-direction: row;
`;
const RatingText = styled.Text`
	font-size: 15px;
`;

const CardList = styled.FlatList``;
const CardContainer = styled.View`
	flex: 1;
	margin: 2%;
	height: 250px;
	width: auto;
	padding: 5%;
	margin-left: 10px;
	border-radius: 5px;
	background-color: #fff;

	shadow-color: #171717;
	shadow-offset: -5px 5px;
	shadow-opacity: 0.1;
	shadow-radius: 5px;
`;
const CardText = styled.Text`
	font-size: 15px;
	flex: 1;
	color: #646665;
`;
const CardVisual = styled.View`
	flex: 5;
	margin-bottom: 1%;
`;
const RemainingCard = (props) => {
	const { restaurant } = props;
	console.log(restaurant.image_url);
	return (
		<>
			<CardContainer>
				<CardVisual>
					<CardImage source={{ uri: restaurant.image_url }} />
				</CardVisual>
				<CardText>{restaurant.name}</CardText>
				<RatingContainer>
					<RatingText>{restaurant.rating}</RatingText>
				</RatingContainer>
			</CardContainer>
		</>
	);
};
export default RemainingCard;
