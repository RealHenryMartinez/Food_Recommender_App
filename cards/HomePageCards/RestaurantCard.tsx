import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { IRestaurantDetail } from "../../interfaces/restaurantInterface";

const CardContainer = styled.View`
  width: 225px;
  height: 205px;
  padding: 16px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #FFFFFF;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 0px;
  shadow-opacity: 1;
  shadow-radius: 10px;
  elevation: 2;
`;
const CardImage = styled.Image`
  width: 100%;
  height: 125px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;
const CardText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #2D2D2D;
  margin-top: 10px;
`;
const CardRating = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #2D2D2D;
  margin-left: 4px;
`;
const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
interface IRestaurant {
  restaurantInfo: IRestaurantDetail;
}

const RestaurantCard = (props:IRestaurant) => {
  const { restaurantInfo } = props;
  return (
    <>
      <CardContainer>
        <CardImage source={{ uri: restaurantInfo.image_url }} />
        <CardText>{restaurantInfo.name}</CardText>
        <RatingContainer>
          <AntDesign name="star" size={16} color="#F2D43A" />
          <CardRating>{restaurantInfo.rating.toFixed(1)}</CardRating>
        </RatingContainer>
      </CardContainer>
    </>
  );
};

export default RestaurantCard;
