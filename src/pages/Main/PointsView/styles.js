import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { transparentize, darken } from 'polished';
import * as color from '../../../styles/colors';

export const PageViewPoint = styled.div`
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

export const Ponto = styled.div`
  display: flex;
  margin: 48px auto 80px auto;
  padding: 64px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
  flex-direction: column;

  img {
    height: 300px;
    border-radius: 12px;
    margin-bottom: 40px;
    object-fit: cover;
  }
`;

export const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: row;
  align-items: center;
  margin-bottom: 40px;

  h1 {
    font-size: 36px;
    margin-right: 16px;
  }
`;

export const Legend = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  span {
    font-size: 16px;
    font-weight: normal;
    color: ${color.text};
  }

  .leaflet-container {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    margin-bottom: 24px;
    margin-top: 16px;
  }
`;

export const Acessibility = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  font-weight: bold;
  color: ${color.verify};

  div {
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    background: ${color.verify};
    margin-right: 8px;
    border-radius: 50%;
  }

  svg {
    width: 15px;
    height: 15px;
    color: #fff;
  }
`;

export const Actions = styled.div`
  margin-bottom: 40px;
  display: flex;
  a {
    flex: 1;
    height: 60px;
    background: ${color.secundary};
    border-radius: 8px;
    text-decoration: none;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-family: 'Ubuntu';

    &:hover {
      background: ${darken(0.1, color.secundary)};
    }

    &:last-child {
      margin-left: 16px;
    }

    strong {
      flex: 1;
      text-align: center;
      color: #fff;
    }

    span {
      display: block;
      background: rgba(0, 0, 0, 0.08);
      width: 72px;
      height: 60px;
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
  }
`;

export const Warning = styled(Link)`
  display: flex;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: ${color.primary};
  background: ${transparentize(0.8, color.primary)};
  font-size: 13px;

  &:hover {
    border: 1px solid ${color.primary};
  }
`;
