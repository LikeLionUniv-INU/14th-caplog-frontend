import styled from 'styled-components';
import picsearch from '../assets/picsearch.svg';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 370px;
  height: 41px;
  border-radius: 30px;
  background-color: #fff0dd;
`;

const SearchBarInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #b55116;
  }
`;

const SearchButton = styled.button`
  width: 29px;
  height: 29px;
  border: none;
  padding-right: 4px;
  background-color: #fdba74;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 15px;
    height: 19px;
  }
`;

function SearchBar() {
  return (
    <SearchBarContainer>
      <SearchBarInput type="search" placeholder="검색" />
      <SearchButton>
        <img src={picsearch} alt="검색" />
      </SearchButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
