import { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 7px;
`;

const FilterButton = styled.button`
  width: 61px;
  height: 31px;

  border: none;
  border-radius: 16px;

  background-color: ${(props) => (props.$active ? '#FFd1a1' : '#FFF0DD')};

  color: #7c2d12;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
`;

function PreviewFilter() {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  return (
    <FilterContainer>
      <FilterButton
        type="button"
        $active={selectedFilter === '전체'}
        onClick={() => setSelectedFilter('전체')}
      >
        전체
      </FilterButton>

      <FilterButton
        type="button"
        $active={selectedFilter === '공부'}
        onClick={() => setSelectedFilter('공부')}
      >
        공부
      </FilterButton>

      <FilterButton
        type="button"
        $active={selectedFilter === '학교'}
        onClick={() => setSelectedFilter('학교')}
      >
        학교
      </FilterButton>

      <FilterButton
        type="button"
        $active={selectedFilter === '일상'}
        onClick={() => setSelectedFilter('일상')}
      >
        일상
      </FilterButton>

      <FilterButton
        type="button"
        $active={selectedFilter === '기타'}
        onClick={() => setSelectedFilter('기타')}
      >
        기타
      </FilterButton>
    </FilterContainer>
  );
}

export default PreviewFilter;
