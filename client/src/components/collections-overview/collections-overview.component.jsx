import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { CollectionsOverviewContainer } from "./collections-overview.styles";
// import "./collections-overview.styles.scss";

const CollectionsOverview = props => (
  <CollectionsOverviewContainer>
    {props.collections.map(({ id, ...otherColletionProps }) => {
      return <CollectionPreview key={id} {...otherColletionProps} {...props} />;
    })}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
