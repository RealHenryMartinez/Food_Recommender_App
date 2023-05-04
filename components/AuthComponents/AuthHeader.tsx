import React from "react";
import styled from "styled-components";

const HeaderText = styled.Text`
	font-size: 25px;
	font-weight: 600;
`;
const HeaderContainer = styled.View`

  margin-left: 5%;
  margin-bottom: 5%;
`;

type IHeader = { header: string };
export default function AuthHeader(props: IHeader) {
	const { header } = props;

	return (
		<>
			<HeaderContainer>
				<HeaderText>{header}</HeaderText>
			</HeaderContainer>
		</>
	);
}
