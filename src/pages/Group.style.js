import styled from "styled-components";

export const GroupContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;

  padding-top: 50px;
  margin-bottom: 34px;
`;

export const BackButton = styled.button`
  width: 32px;
  height: 32px;

  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 14px;
    height: 24px;
  }
`;

export const GroupInfoBox = styled.div`
  width: 100%;
  min-height: 126px;

  padding: 16px 18px;
  box-sizing: border-box;

  background-color: #ffcd98;
  border-radius: 16px;

  margin-bottom: 18px;
`;

export const InfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 26px;

  border-radius: 20px;
  background-color: #fff3e3;

  color: #b55116;
  font-size: 12px;
  font-weight: 600;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.button`
  width: 28px;
  height: 28px;

  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const GroupTitle = styled.h2`
  margin: 18px 0 0;

  color: #7c2d12;
  font-size: 18px;
  font-weight: 700;
`;

export const GroupCount = styled.p`
  margin: 10px 0 0;

  color: #8f3d18;
  font-size: 14px;
  font-weight: 400;
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const Card = styled.button`
  min-width: 0;
  height: 270px;

  padding: 20px 14px 14px;
  box-sizing: border-box;

  border-radius: 16px;
  background-color: #fff0dd;

  cursor: pointer;
  border: none;
`;

export const CardTitle = styled.p`
  margin: 0 0 18px;

  color: #7c2d12;
  font-size: 12px;
  font-weight: 600;

  line-height: 1.4;
`;

export const CardImage = styled.img`
  display: block;

  width: 100%;
  height: 205px;

  border-radius: 12px;
  object-fit: cover;

  background-color: #ffffff;
`;