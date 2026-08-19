import styled from 'styled-components';

export const HomeContainer = styled.main`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 16px 100px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export const Header = styled.header`
  height: 115px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  width: 76px;
  height: auto;
  display: block;
`;

export const AlarmButton = styled.button`
  position: relative;

  border: none;
  background: none;
  padding: 0;

  color: #b55116;

  cursor: pointer;
`;

export const AlarmBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -7px;

  min-width: 16px;
  height: 16px;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  border-radius: 999px;
  background-color: #f03232;

  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
`;

export const MemoryBox = styled.section`
  position: relative;

  padding: 32px 12px 12px;

  border-radius: 20px;
  background-color: #ffd1a1;
`;

export const MemoryTitle = styled.p`
  margin: 0 0 24px 8px;

  font-size: 17px;
  font-weight: 700;
  color: #7c2d12;
`;

export const MemoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 188px;
  overflow-y: auto;

  margin: 0;
  padding: 0;

  list-style: none;
`;

export const MemoryItem = styled.li`
  width: 100%;
  min-height: 56px;

  padding: 0 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  border-radius: 14px;
  background-color: #fff7ed;

  cursor: pointer;

  font-size: 13px;
  font-weight: 600;
  color: #b55116;
`;

export const MemoryRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  flex-shrink: 0;
`;

export const Dday = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 52px;
  height: 34px;

  padding: 0 10px;

  border-radius: 30px;

  background-color: ${({ $active }) => ($active ? '#e26f0b' : '#fdba74')};

  color: ${({ $active }) => ($active ? '#fff7ed' : '#7c2d12')};

  font-weight: 700;
`;

export const ArrowButton = styled.button`
  border: none;
  background: none;

  padding: 4px;

  font-size: 24px;
  line-height: 1;

  cursor: pointer;
`;

export const PreviewSection = styled.section`
  margin-top: 22px;
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 16px;

  padding: 0 4px;
`;

export const SearchSection = styled.div`
  margin-top: 20px;
`;

export const PreviewTitle = styled.p`
  margin: 0;

  font-size: 18px;
  font-weight: 700;
  color: #7c2d12;
`;

export const AllButton = styled.button`
  border: none;
  background: none;

  padding: 0;

  font-size: 13px;
  color: #7c2d12;

  cursor: pointer;
`;

export const PreviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 177px);
  gap: 16px;
`;

export const FilterSection = styled.div`
  margin-bottom: 12px;
`;
