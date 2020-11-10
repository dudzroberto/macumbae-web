import { createGlobalStyle } from 'styled-components';
import * as color from './colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: ${color.light};
    -webkit-font-smoothing: antialiased;
    color: ${color.text};
  }

  body, input, textarea, button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${color.primary};
    font-family: Ubuntu;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    outline : none;
  }

  //TOASTIFY//
  .Toastify__toast {
    border-radius: 12px;
    text-align: center;
  }

  .Toastify__toast--warning {
    background:${color.error}
  }

  .Toastify__toast--success {
    background:${color.secundary}
  }
  //TOASTIFY//

`;
