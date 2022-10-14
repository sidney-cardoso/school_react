import styled, { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }
    body {
        font-family: 'Work Sans', sans-serif;
        background-color: ${colors.primaryDarkColor};
        color: ${colors.primaryColor}
    }
    html, body, #root {
        height: 100%;
    }
    button {
        border: none;
        cursor: pointer;
        background: ${colors.primaryColor};
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: 700;
    }
    a {
        text-decoration: none;
        color: ${colors.primaryColor};
    }
    ul {
        list-style: none;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background-color: ${colors.successColor};
        color: #fff;
    }
    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background-color: ${colors.errorColor};
        color: #fff;
    }
`;

export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
