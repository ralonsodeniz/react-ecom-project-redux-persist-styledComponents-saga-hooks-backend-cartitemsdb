import styled, { css } from "styled-components"; // styled is used to create the styled components we export and use | css allows us to write a block of css that we can pass in and render as css inside any of our styled componets
import { Link } from "react-router-dom";

// this will be the css shared in the Link and div we want with option styles
// when we need to share styles in diferent styled components we do like this, we create the style and then we pass it to the components
const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

// option need to be shared for Link and div | we use string interpolation and js code to pass the style
export const OptionLinkContainer = styled(Link)`
  ${OptionContainerStyles}
`;

export const OptionDivContainer = styled.div`
  ${OptionContainerStyles}
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
