import styled from 'styled-components';
// import { darken } from 'polished';
// import * as color from '../../../styles/colors';

export const PagePoint = styled.div`
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

export const MapBox = styled.div`
  flex: 1;
  display: flex;
  height: 100%;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

export const MapLoading = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Adsense = styled.div`
  position: absolute;
  width: 100%;
  height: 90px;
  bottom: 20px;
  right: 0;
  background: red;
  z-index: 99999;
`;
