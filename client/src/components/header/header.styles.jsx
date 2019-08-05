import styled, { css } from "styled-components"; // styled is used to create the styled components we export and use | css allows us to write a block of css that we can pass in and render as css inside any of our styled componets
import { Link } from "react-router-dom";

// this will be the css shared in the Link and div we want with option styles
// when we need to share styles in diferent styled components we do like this, we create the style and then we pass it to the components
const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

// we create the header
export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

// logo-container using Link component from react-router-dom
// instead of using styled.element we use style as a function to whom we pass the component we want to style
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`;

// options
export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

// option need to be shared for Link and div | we use string interpolation and js code to pass the style
export const OptionLinkContainer = styled(Link)`
  ${OptionContainerStyles}
`;

export const OptionDivContainer = styled.div`
  ${OptionContainerStyles}
`;
