import styled from "styled-components";
import RemainingCard from "./RemainingCard";

const CardContainer = styled.View`
	flex: 1;
`;
const CardList = styled.FlatList``;

const NullList = styled.FlatList``;
const NullCardContainer = styled.View`
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
const NullCardText = styled.Text`
	font-size: 15px;
	flex: 1;
	color: #646665;
`;
const NullCardVisual = styled.View`
	flex: 2;
	margin-bottom: 1%;
	background-color: #e1e3e1;
`;
const RemainingRestaurants = (props) => {
	const { businesses } = props;
	const loadingAmount = [1, 2, 3, 4, 5];
	// switch (businesses) {
	// 	case !null:
	// 		return (
	// 			<>
	// 				<CardContainer>
	// 					<CardList
	// 						data={businesses}
	// 						renderItem={({ item }) => {
	// 							return (
	// 								<>
	// 									<RemainingCard restaurant={item} />
	// 								</>
	// 							);
	// 						}}
	// 					/>
	// 				</CardContainer>
	// 			</>
	// 		);
	// 	default:
	// 		return (
	// 			<>
	// 				<NullList
	// 					data={loadingAmount}
	// 					renderItem={({ item }) => {
	// 						return (
	// 							<NullCardContainer>
	// 								<NullCardVisual></NullCardVisual>
	// 								<NullCardText>
	// 									Loading Restaurants...
	// 								</NullCardText>
	// 							</NullCardContainer>
	// 						);
	// 					}}
	// 				/>
	// 			</>
	// 		);
	// }
    return (
        <>
            <CardContainer>
                <CardList
                    data={businesses}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <RemainingCard restaurant={item} />
                            </>
                        );
                    }}
                />
            </CardContainer>
        </>
    );
};

export default RemainingRestaurants;
