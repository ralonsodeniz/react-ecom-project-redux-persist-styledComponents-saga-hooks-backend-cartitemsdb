// we are going to use this container to wrap the components that uses withSpinner to pass them the selectors they need since there is no point on poluting the shop component with data is only used by the components themsleves
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux"; // we use this in order to make easier to understand the wrapping of the components

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spiner.component";
import CollectionsOverview from "./collections-overview.component";

// we need to get from the store all the props the component needs to be rendered
// the props we create needs to have the same name the component that is going to be wrapped spects in its call. this is important
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching
});

// we create now a connected component, in order to be able to access mapStateToProps, wrapped in the WithSpinner and also wrapped by this container so it gets the isLoading
// this is without compose
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionsOverview)
// );

// using compose we pass first the wrappers in the order you want to wrap and then the original component to be wrapped. It evaluates from right to left
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
