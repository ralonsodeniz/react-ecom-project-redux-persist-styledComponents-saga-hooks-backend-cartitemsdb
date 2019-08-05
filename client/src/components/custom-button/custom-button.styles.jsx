import styled, { css } from "styled-components";

// we want to create the sepparate styles we have for our google sign in and our inverted button

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignStyles = css`
  background-color: #4285f4;
  color: white;
  border: none;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

// we also create a separate style for the styles that are conflicting with invertedButtonStyles so we return theem or not

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

// now instead of rendering these two styles directly into CustomButtonContainer we write a function we are going to use inside of it and it will return the styles depending on the inputs, because this is just js

const getButtonStyle = props => {
  if (props.isGoogleSignIn) {
    return googleSignStyles;
  }
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

// here we create a CustomButtonContainer that contains the shared styles for all the buttons and the function that gets the extra styles depending on the button type
export const CustomButtonContainer = styled.button`
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  overflow: hidden;
  ${getButtonStyle}; /* we need to use string interpolation syntax to call the function inside the styled component  */
`;
