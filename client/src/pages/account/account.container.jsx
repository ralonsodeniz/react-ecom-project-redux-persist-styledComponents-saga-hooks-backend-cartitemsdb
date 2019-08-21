import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/with-spinner/with-spiner.component";
import AccountPage from "./account.component";
import { selectIsCheckingUser } from "../../redux/user/user.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCheckingUser
});

const AccountPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(AccountPage);

export default AccountPageContainer;
