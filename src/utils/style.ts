import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    height: 100%;
    /* overflow-y: scroll; */
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
  
`;

export default GlobalStyles;
