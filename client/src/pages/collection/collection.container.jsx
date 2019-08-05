import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectorIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spiner.component";
import CollectionPage from "./collection.component";

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectorIsCollectionsLoaded(state) // here we need to check for the collection to be loaded. the isfetching selector does not work since it will try to render the component befor the shop page and the collection would be empty
  // here we cannot use isLoading: !selectorIsCollectionsLoaded to get the inverted value of what the selector returns because when using createStructuredSelector what we assign to the prop has to be a function, thats why we use the auxiliary function passing the state ourself so we can do !selectorIsCollectionsLoaded(selector)
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;

// containers do not render anything, they just pass props down to components
