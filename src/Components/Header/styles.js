import styled from 'styled-components';
import * as color from '../../styles/colors';

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;
  align-items: center;
  background: ${color.light};
`;

export const BackButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  button {
    display: flex;
    align-items: center;
    color: ${color.primary};
    font-family: 'Ubuntu';
    font-size: 20px;
    background: none;
    border: 0;

    svg {
      width: 24px;
      height: 24px;
      color: ${color.secundary};
      margin-right: 8px;
    }
  }
`;
