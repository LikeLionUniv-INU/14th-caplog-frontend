import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일
const PreviewBoxContainer = styled.button`
  position: relative;

  width: 177px;
  height: 220px;

  padding: 0;
  border: none;
  border-radius: 14px;
  overflow: hidden;

  background: none;
  cursor: pointer;
`;

const PreviewImageWrapper = styled.div`
  position: relative;

  width: 177px;
  height: 178px;
`;

const PreviewImage = styled.img`
  display: block;
  width: 177px;
  height: 178px;
  object-fit: cover;
`;

const NewBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;

  padding: 4px 7px;

  border-radius: 10px;
  background-color: #f03232;

  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
`;

const CountBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;

  padding: 4px 7px;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.55);

  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
`;

const PreviewTitle = styled.p`
  width: 177px;
  height: 42px;

  margin: 0;
  padding: 0 8px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ $isGroup }) => ($isGroup ? '#fff0dd' : '#fff8ef')};

  font-size: 12px;
  font-weight: 600;

  color: ${({ $isGroup }) => ($isGroup ? '#b55116' : '#d58d5d')};
`;
// 스타일 끝

function PreviewBox({ id, image, title, isGroup, isNew, elementCount }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isGroup) {
      navigate(`/Group/${id}`);
    } else {
      navigate(`/Detail/${id}`);
    }
  };

  return (
    <PreviewBoxContainer type="button" onClick={handleClick}>
      <PreviewImageWrapper>
        <PreviewImage src={image} alt={title} />

        {isNew && <NewBadge>NEW</NewBadge>}

        {isGroup && elementCount > 1 && (
          <CountBadge>+{elementCount}</CountBadge>
        )}
      </PreviewImageWrapper>

      <PreviewTitle $isGroup={isGroup}>{title}</PreviewTitle>
    </PreviewBoxContainer>
  );
}

export default PreviewBox;
