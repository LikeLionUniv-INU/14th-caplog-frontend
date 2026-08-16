import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PreviewBoxContainer = styled.button`
  width: 177px;
  height: 220px;

  padding: 0;
  border: none;
  border-radius: 14px;
  overflow: hidden;

  background: none;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  display: block;
  width: 177px;
  height: 178px;
  object-fit: cover;
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

  background-color: #fff0dd;

  font-size: 12px;
  font-weight: 600;
  color: #b55116;
`;

function PreviewBox({ image, title }) {
  const navigate = useNavigate();

  return (
    <PreviewBoxContainer type="button" onClick={() => navigate('/Group')}>
      <PreviewImage src={image} alt={title} />

      <PreviewTitle>{title}</PreviewTitle>
    </PreviewBoxContainer>
  );
}

export default PreviewBox;
