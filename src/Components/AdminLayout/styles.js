import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import { darken } from 'polished';
import * as color from '../../styles/colors';

export const PageAdminDashBoard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const DataBox = styled.div`
  margin: 0 auto 80px auto;
  padding: 64px;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    justify-content: space-between;
    h1 {
      font-size: 36px;
    }
    p {
      display: flex;
      align-items: center;

      svg {
        color: ${color.primary};
        margin-left: 8px;
      }
    }
  }

  p {
    color: ${color.text};
    strong {
      text-transform: capitalize;
    }
  }

  strong {
    color: ${color.primary};
  }

  fieldset {
    margin-top: 32px;
    border: 0;
  }
`;

export const Menu = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 64px;
  background: ${color.primary};
  border-radius: 12px;
  margin-bottom: 36px;
`;

const activeClassName = 'nav-item-active';

export const MenuLink = styled(NavLink).attrs({
  activeClassName,
})`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 32px;
  font-family: 'Ubuntu';
  text-decoration: none;
  color: #fff;
  transition: color 0.2s;

  &:hover {
    color: ${color.secundary};
  }

  &.${activeClassName} {
    color: ${color.secundary};
  }

  svg {
    font-size: 26px;
    margin-right: 8px;
    color: ${color.secundary};
    transition: color 0.2s;
  }
`;
