import styled from 'styled-components';
import { darken } from 'polished';
import * as color from '../../../styles/colors';
import HomeBackground from '../../../assets/home-background.svg';

export const PageHome = styled.div`
  height: 100%;
  background: url(${HomeBackground}) no-repeat;
  background-position: 650px center;

  @media (max-width: 1100px) {
    background-position: 500px center;
  }

  @media (max-width: 829px) {
    background-position: 400px center;
  }
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

export const Main = styled.div`
  flex: 1;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 54px;
    color: ${color.primary};
    margin-top: 24px;
  }

  p {
    font-size: 20px;
    margin-top: 20px;
    line-height: 32px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  a {
    width: 100%;
    height: 72px;
    background: ${color.secundary};
    border-radius: 8px;
    text-decoration: none;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 40px;
    margin-right: 24px;
    font-family: 'Ubuntu';
    font-size: 18px;

    &:hover {
      background: ${darken(0.1, color.secundary)};
    }

    span {
      display: block;
      background: rgba(0, 0, 0, 0.08);
      width: 72px;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      svg {
        color: #fff;
        width: 24px;
        height: 24px;
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: #fff;
    }
  }
`;
