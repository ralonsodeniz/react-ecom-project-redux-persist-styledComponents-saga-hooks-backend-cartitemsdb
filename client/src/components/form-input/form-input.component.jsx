import React from "react";

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabelContainer
} from "./form-input.styles";
// import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <GroupContainer>
      <FormInputContainer onChange={handleChange} {...otherProps} />
      {/*  the ...otherProps are all of the props of the input component in the sign-in.component */}
      {label ? (
        <FormInputLabelContainer shrink={otherProps.value.length}>
          {label}
        </FormInputLabelContainer>
      ) : null}
    </GroupContainer>
  );
};

export default FormInput;
