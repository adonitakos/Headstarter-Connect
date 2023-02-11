// File: /src/components/AuthElements.js

import styled from 'styled-components';

// Big Purple Rectangle
export const AuthContainer = styled.div `
    background: #3D56F0;
    border-radius: 10px;    
    width: 462px;
    height: 552px;
    margin: 10rem auto;
`;

// Sign Up / Login
export const AuthBanner = styled.h1 `
    width: 158px;
    height: 63px;
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    color: #FFFFFF;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
`;

// Input fields for Email, Password, etc. (they will have placholders for clarification)
export const AuthInput = styled.input`
  background: #E6E6E6;
  border-radius: 13px;
  height: 47px;
  width: ${props => props.style && props.style.width};
  margin-left: auto;
  margin-right: auto;
  font-family: 'Poppins';
  font-style: normal;
`;

// Register / Login
export const AuthButton = styled.button `
    width: 179px;
    height: 61px;
    margin-top: 5rem;

    background: #E6E6E6;
    border-radius: 73px;
    font-weight: 700;
    font-size: 26px;
    line-height: 39px;

    color: #3D56F0;

    font-family: 'Poppins';
    font-style: normal;
`;
