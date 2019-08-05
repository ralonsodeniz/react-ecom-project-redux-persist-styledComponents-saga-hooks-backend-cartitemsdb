import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spiner.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  // in this case we are going to use the typical REST interface to get the data from firestore using fetch and req,res
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    // when using fetch option the url to fetch is always the same for every project but changing crwn-clothing-rad for your project id
    // https://firestore.googleapis.com/v1/projects/crwn-clothing-rad/database/(default)/documents/ to this url we have to add the collection we want to get in this case "collections"
    fetch(
      "https://firestore.googleapis.com/v1/projects/crwn-clothing-rad/database/(default)/documents/collections"
    )
      .then(response => response.json())
      // the fetch method does not give back a reference object or a snapshot object since we are not using firebase api
      // it retruns us an object that has the documents of the collection in one array
      // each document inside the array is the document with the fields we have in our firestore db with its items
      // the structure inside the fields property does not have the same structure, it is more nested inside objects
      .then(collections => console.log(collections));
    // because of the nested nature and the difference in the structure of the data we cannot use the same convertCollectionSnapshotToMap and we would have to refactor that function

    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
