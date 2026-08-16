import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100dvh;
  background-color: #ffffff;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  text-align: left;
  padding: 20px 0;
  margin-top: 10px;
`;

export const BackIcon = styled.img`
  width: 10px;
  margin-right: 14px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: #7c2d12;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterChip = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 12px;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
  color: ${({ $isActive }) => ($isActive ? '#7C2D12' : '#B55116')};
  background-color: ${({ $isActive }) => ($isActive ? '#FDBA74' : '#FFF0DD')};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 90%;
`;

export const NotificationCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff0dd;
  border-radius: 16px;
  padding: 12px;
  gap: 12px;
  cursor: pointer;
`;

export const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background-color: #e5e7eb;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`;

export const Category = styled.span`
  font-size: 11px;
  color: #7c2d12;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #7c2d12;
  margin: 0;
  line-height: 1.4;
  word-break: keep-all;
  white-space: pre-wrap;
`;

export const SubText = styled.span`
  font-size: 10px;
  color: #7c2d12;
  margin-top: 2px;
`;

export const NextIcon = styled.img`
  width: 10px;
  margin-right: 4px;
  cursor: pointer;
`;
