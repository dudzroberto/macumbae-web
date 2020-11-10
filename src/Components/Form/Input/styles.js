import styled from 'styled-components';
import * as color from '../../../styles/colors';

export const Error = styled.span`
  display: flex;
  font-size: 13px;
  color: ${color.error};
  padding-top: 8px;
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;
