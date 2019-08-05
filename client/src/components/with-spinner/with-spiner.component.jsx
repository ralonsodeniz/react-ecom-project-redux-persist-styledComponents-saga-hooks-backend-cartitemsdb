import React from "react";

import Spinner from "../spinner/spinner.component";

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  // this is a HOC (higher order component) it takes as inputs a component and some props, executes the code and retruns a modified version of the component itslef we passed as parameter
  return isLoading ? (
    // if the component is loading we pass the loading spinner we created using the styled components
    <Spinner />
  ) : (
    // if it is not loading we pass the wrapped component and we pass through the props to the component
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;

// the HOC uses currying functions we execute the component code first with the frist parameter and it returns a function that is executed the with the second parameters and returns the final resutl
