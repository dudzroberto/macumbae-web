import styled from 'styled-components';
import * as color from '../../styles/colors';

export const Styles = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: 0;

    thead {
      font-family: 'Ubuntu';
      color: ${color.primary};
      tr {
        &:first-child {
          display: none;
        }
      }
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tbody {
      color: ${color.text};
      font-size: 14px;
    }

    th,
    td {
      vertical-align: middle;
      margin: 0;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
