import { useState } from 'react';
import styled from 'styled-components';

// 스타일
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
// 스타일 끝

const filters = [
  { label: '전체', value: 'TOTAL' },
  { label: '공부', value: 'STUDY' },
  { label: '학교', value: 'SCHOOL' },
  { label: '일상', value: 'DAILY' },
  { label: '기타', value: 'ETC' },
];

function PreviewFilter({ selectedFilter, onFilterChange }) {
  return (
    <FilterContainer>
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          type="button"
          $active={selectedFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

export default PreviewFilter;
