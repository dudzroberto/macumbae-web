import styled from 'styled-components';
// import { darken } from 'polished';
// import * as color from '../../../styles/colors';

export const Content = styled.div``;

export const SelectBox = styled.div`
  width: 200px;
`;

export const TableContent = styled.div`
  margin-top: 40px;
  table {
    thead {
      tr {
        th {
          &:first-child {
            text-align: left;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          &:first-child {
            width: 100%;
            text-align: left;
          }
        }
      }
    }
  }
`;
