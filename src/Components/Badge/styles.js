import styled from 'styled-components';

export const Container = styled.div`
  display: ${(props) => (props.visible <= 0 ? 'none' : 'flex')};
  position: absolute;
  top: -8px;
  left: -8px;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: red;
  border-radius: 50%;
  span {
    color: #fff;
    font-size: 10px;
  }
`;
