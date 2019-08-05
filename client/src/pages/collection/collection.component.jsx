import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

import {
  CollectionItemsContainer,
  CollectionTitleContainer,
  CollectionPageContainer
} from "./collection.styles";
// import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitleContainer>{title}</CollectionTitleContainer>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem
            className="collection-item"
            key={item.id}
            item={item}
          />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

// !!! MAPSTATETOPROPS HAS A SECOND ARGUMENT THAT IS ownProps that are the props of the own component that is wrapped by connect
// since we have to access the second argument of mapStateToProps we don't use createStructuredSelector
const mapStateToProps = (state, ownProps) => ({
  // inside ownProps we have match that is a props that is passed to the component by the Route where it is called
  collection: selectCollection(ownProps.match.params.collectionId)(state) // this is currying, in selectCollection selector we have the find and the createSelector that uses selectShopCollections that needs state for the selectShop input selector
  // it first executes selectColletion with ownProps.match.params.collectionId and it returns the function with the partial result and executes it again using state to finish wiring everything together and return the selected collection
});

export default connect(mapStateToProps)(CollectionPage);
