import styled from 'styled-components';
import * as color from '../../styles/colors';

export const DropzoneBox = styled.div`
  height: 300px;
  background: #f9fff8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  outline: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${color.primary};

    svg {
      color: ${color.secundary};
      width: 35px;
      height: 35px;
      margin-bottom: 8px;
    }
  }
`;
