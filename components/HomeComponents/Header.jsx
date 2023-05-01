import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.View`
    margin: 2%;
    padding: 5%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #cfcdcc;
    border-radius: 15px;
    
`
const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: 600;
`

const Header = () => {
    return (
        <>
        <MainContainer>
            <HeaderText>
                Find the best selection of food
            </HeaderText>
        </MainContainer>
        </>
    );
}

export default Header;
