import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/with-spinner/with-spiner.component";
import CheckoutPage from "./checkout.component";
import { selectIsCheckingUser } from "../../redux/user/user.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCheckingUser // remember the prop name has to match the prop name WithSpinner (or any other HOC we will be using with compose) for it to work
});

const CheckoutPageContainer = compose(
  // compose executes from inside to outside so it will first apply WithSpinner HOC and then connect HOC to CheckoutPage component
  connect(mapStateToProps),
  WithSpinner
)(CheckoutPage);

export default CheckoutPageContainer;
