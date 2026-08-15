import styled from "styled-components";

export const DetailContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
`;

export const ImageSection = styled.div`
  position: relative;

  width: 100%;
  height: 50%;

  background-color: #f3f3f3;
  overflow: hidden;
`;

export const Header = styled.div`
  position: absolute;
  top: 24px;
  left: 20px;

  z-index: 2;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  padding: 0;

  cursor: pointer;

  img {
    width: 22px;
    height: auto;
    display: block;
  }
`;

export const ImageButton = styled.button`
  width: 100%;
  height: 100%;

  border: none;
  background-color: #eeeeee;
  padding: 0;

  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;

    display: block;
    object-fit: cover;
  }
`;

export const InfoSection = styled.div`
  width: 100%;
  height: 50%;

  box-sizing: border-box;

  padding: 24px 20px 30px;

  background-color: #fff0dd;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
`;

export const Title = styled.h2`
  margin: 0;

  color: #7c2d12;

  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
`;

export const Dday = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 54px;
  height: 30px;

  padding: 0 10px;

  border-radius: 16px;

  background-color: #fdba74;
  color: #7c2d12;

  font-size: 12px;
  font-weight: 600;
`;

export const Divider = styled.hr`
  width: 100%;

  margin: 22px 0 18px;

  border: none;
  border-top: 1px solid #ead8ca;
`;

export const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SummaryTitle = styled.p`
  margin: 0;

  color: #7c2d12;

  font-size: 16px;
  font-weight: 600;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;

  padding: 0;

  cursor: pointer;

  img {
    width: 18px;
    height: 18px;

    display: block;
  }
`;

export const SummaryBox = styled.div`
  margin-top: 20px;

  color: #7c2d12;

  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 18px;
  }
`;