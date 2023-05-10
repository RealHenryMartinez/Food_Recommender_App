import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';
import { ICategoryDetails } from '../../interfaces/restaurantInterface';
import CardContainer from './CardContainer';
import { getTotalCategories } from '../../store/HomePageSlices/useBusinessSlice';
import { useAppSelector } from '../../store/Features/hook';

const Container = styled.View`

  align-items: center;
  justify-content: center;
  margin-bottom: 10%;
  margin-top: 20%;
`;

const SearchInput = styled.TextInput`
    margin-left: 2%;
`
const SearchContainer = styled.View`
    padding: 5%;
    width: 85%;
    font-size: 12px;
    border-radius: 5px;
    background-color: #fff;

    shadow-color: #171717;
    shadow-offset: -5px 5px;
    shadow-opacity: 1;
    shadow-radius: 5px;
    flex-direction: row;
`
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = useAppSelector(getTotalCategories);

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  }

  return (
    <Container>
      <SearchContainer>
        <Foundation name="magnifying-glass" size={24} color="#cfcdcc" />
        <SearchInput
          placeholder="Search restaurants by category"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </SearchContainer>
      {/* {filteredCategories.map((category: ICategoryDetails) => (
        <CardContainer key={category.title} categories={category.title} />
      ))} */}
    </Container>
  );
}

export default SearchBar;
