import styled from 'styled-components';
import { Form } from '@unform/web';
import { darken } from 'polished';
import * as color from '../../../styles/colors';
import HomeBackground from '../../../assets/admin.svg';

export const PageHome = styled.div`
  height: 100%;
  background: url(${HomeBackground}) no-repeat;
  background-position: center center;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
`;

export const FormBox = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Fieldset = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  input[type='email'],
  input[type='password'] {
    height: 50px;
    background: #f9fff8;
    border-radius: 0 8px 8px 0;
    border: 0;
    padding: 0px 26px 0px 66px;
    font-size: 16px;
    color: #6c6c80;
    border: 1px solid #f9fff8;
    outline: none;
  }
`;

export const Icon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background: ${color.primary};
  border-radius: 8px 0 0 8px;
  border: 1px solid ${color.primary};

  svg {
    color: ${color.secundary};
    height: 22px;
    width: 22px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  background: ${color.secundary};
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  border: 0;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background: ${darken(0.1, color.secundary)};
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Ubuntu';

    svg {
      margin-right: 8px;
      width: 24px;
      height: 24px;
    }
  }
`;
