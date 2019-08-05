import React, { Component } from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";

// it has to be a class component since it needs to have access to lifecycle hooks
class ErrorBoundary extends Component {
  // we create a local state to register if it has or not registered an error
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  // in order to React know this is an error boundary component we need to use either one or both of two lifecycle hooks, static getDerivedStateFromError() or ComponentDidCatch()
  // this first hook needs a state
  static getDerivedStateFromError(error) {
    // this catches any errror that occurs in any children inside the error boundary component
    // the errror gets passed as parameter of the lifecycle hook and we can process the error
    return { hasError: true }; // this lifecycle hook has inherit setState in its returned object
  }
  // it is importante to set the error to be aware that a children has caused an error
  // it allows us to catch the error ahead of time when it gets thrown ahead of time inside the boundary component so we can render something in this component instead of showing the error to the user

  // the second lifecycle hook we can use is componentDidCath()
  // what it does is it gives us access to the error and the info | info is information about the error, for example which component caused it
  componentDidCatch(error, info) {
    // all we really do here is log the error or send it somewhere
    console.log(error, info);
  }

  render() {
    // if there is an error we retunr a div with an error message, if it is not we return the childrens
    return this.state.hasError ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
        <ErrorImageText> Ooops lost in the web </ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
