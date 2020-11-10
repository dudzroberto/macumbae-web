import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@unform/web';
import * as color from '../../../styles/colors';

export const PageCancelPoint = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FormBox = styled(Form)`
  margin: 48px auto 80px auto;
  padding: 64px;
  width: 100%;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 36px;
  }

  fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
  }

  legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h2 {
      font-size: 24px;
    }
  }

  button {
    width: 260px;
    height: 56px;
    background: ${color.secundary};
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background: ${darken(0.1, color.secundary)};
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 8px;
        width: 24px;
        height: 24px;
      }
    }
  }
`;
