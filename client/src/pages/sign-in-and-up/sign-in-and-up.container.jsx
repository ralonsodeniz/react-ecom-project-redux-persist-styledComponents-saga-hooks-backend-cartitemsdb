import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCheckingUser } from "../../redux/user/user.selectors";
import WithSpinner from "../../components/with-spinner/with-spiner.component";
import SignInAndUpPage from "./sign-in-and-up.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCheckingUser
});

const SignInAndUpPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(SignInAndUpPage);

export default SignInAndUpPageContainer;
