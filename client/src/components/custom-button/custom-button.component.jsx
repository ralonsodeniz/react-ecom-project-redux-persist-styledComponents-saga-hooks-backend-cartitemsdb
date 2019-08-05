import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";
//import "./custom-button.styles.scss";

const CustomButton = (
  { children, ...props } // we destructure children from props to use it in the custom-button component and we spread the rest of the props in an object also colled props to match what we have in the CustomButtonComponent styled component
) => <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;

export default CustomButton;
