import styled, { css } from "styled-components";

// since this is a js file we create the variables as js variables
const subColor = "grey";
const mainColor = "black";

// instead of using @mixing and import we create a css container from styled components
const shrinkLableStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor}; /* we have to use the variable we created with string interpolation syntax */
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLableStyles}
  }
`;

export const FormInputLabelContainer = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => (shrink ? shrinkLableStyles : "")}
`;
