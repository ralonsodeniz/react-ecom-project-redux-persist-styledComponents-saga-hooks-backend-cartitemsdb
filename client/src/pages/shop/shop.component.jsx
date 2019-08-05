import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
// since we are not using selectors in the shop component anymore we don't need the createStructuredSelector method here
// import { createStructuredSelector } from "reselect";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
// we dont need the selector because they are now inside the collection containers
// import {
//   selectIsCollectionsFetching,
//   selectorIsCollectionsLoaded
// } from "../../redux/shop/shop.selectors";
// import WithSpinner from "../../components/with-spinner/with-spiner.component";
// import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
// import CollectionPageContainer from "../collection/collection.container";
import Spinner from "../../components/spinner/spinner.component";

// !- Now we have a container for each CollectionsOverview and CollectionPage that contains the original component modified by WithSipinner HOC to pass it the props it needs without polluting the shop component page
// we are going to create two components using WithSpinner and the components we want to render when the isLoading is false
// here we pass to the HOC the first parameter that is the component to wrap, what we get in return is a function that expects the two arguments of the second parameter to return the component to render
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

// <- WE ADD useEffect HOOK TO CHANGE THIS COMPONENT FROM CLASS TO FUNCTION ->
const ShopPage = ({ fetchCollectionsStart, match }) => {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoading: true
  //   };
  // }

  // this is a shorthand of the above code if we do not need the constructor
  // we can do it because the constructor and the super call setup react will handle in the back for us so we don't have to write constructor and super everytime we need to use state
  // when they see the state just before extending the react component it will get the constructur and super for us
  // state = {
  //   loading: true
  // };
  // we don't need the state anymore since we use to render the spiner or the component isFetrching from the reducer

  // unsubscribeFromSnapshot = null;

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  // componentDidMount() {
  //   // now with saga we start the fetch process with the fetchCollectionStart action that sends the action object with type FETCH_COLLECTIONS_START
  //   // the saga middleware we have added is listening to this precise action type so when it listen to it the NEW fetchCollectionsAsync SAGA will be triggered and run
  //   fetchCollectionsStart();
  //   // this change introduces a bug when we try to enter directly to /shop/collectionId before going first to /shop
  //   // we do not find this problem with the collection preview because that is loaded form the shop page and the fetch occurs before
  //   // this is happening because component did mount is executed after the initial render, and the initial value of isFetching is false, so when it tries to render CollectionPage it tries to render the collection with an empty store since the initial fetch has not happened yet
  //   // to avoid this we are going to use a different selector for the isLoading property of withSpinner collection page component
  //   // we change from selectIsCollectionFetching to selectorIsCollectionsLoaded

  //   // !- we have moved the data fetching from the firestore to the shop action fetchCollectionsStartAsync -!
  //   // const { updateCollections } = this.props;
  //   // we create the reference object to our collections collection
  //   // const collectionRef = firestore.collection("collections");
  //   // we are going to change the method we use from opening a channel to listeng to the onSnapshot observable to make simple API requests to firestore using its interface
  //   // we delete the unsubscribeFromSnapShop since we are not going to use observables and subscribing a observer with its listener here we are going to use promises
  //   // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
  //   // we change the method onSnapshot that creates the observable and the listener we pass as a function and we use .get() to get the snapshot from the coleection reference object
  //   // .get() makes an API call to fetch back the data asociated with the collection. .get() returns a promise
  //   // collectionRef.get().then(snapshot => {
  //   // this converts the snapshot into an object with the elements we need
  //   // const collectionsMap = convertCollectionSnapshotToMap(snapshot);
  //   // we update the collection into the shop redux
  //   // updateCollections(collectionsMap);
  //   // this.setState({ loading: false });
  //   // });
  //   // we pass the snapshot object transformation to the .then() promise
  // }

  // we don't need to unsubscribe the listener from the observable because we are not even open that communication in this case
  //   componentWillUnmount() {
  //     this.unsubscribeFromSnapshot();
  //   }

  // IMPORTANT!!! WHEN WE DO IT THIS WAY, USING PROMISES THE ONLY TIME WE GET NEW DATA FROM THE COLLECTIONS COLLECTION IN FIRESTORE IS WHEN WE REMOUNT THE SHOP COMPONENT
  // WITH THE OBSERVABLE METHOD ONCE WE HAVE OPENED THE CHANNEL THE FIRST TIME WE MOUNT THE SHOP COMPONENT IT KEEPS REGISTERING EVERY CHANGE AND EXECUTING THE LISTENER FUNCION WHEN THERE IS A CHANGE, EITHER THE SHOP COMPONENT IS MOUNTED OR NOT
  // in this case we are just doing one API call when we render the component and treating the data we get

  return (
    <div className="shop-page">
      {/* instead of using component we will use render={(properties we want to pass to the component) => component to render with the properties} */}
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          //   props // props are the Route props needed by the CollectionsOverview component
          // ) => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={!isCollectionsLoaded}
          //     {...props}
          // we switch bak to component since we do not need to pass props to the component we are rendering through Route
          // here we pass to the HOC created with WithSpinner the two arguments of
          // the second parameter of the HOC function
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          // render={props => (
          //   <CollectionPageWithSpinner
          //     isLoading={!isCollectionsLoaded}
          //     {...props}
          //  />
          //)}
          component={CollectionPageContainer}
        />
        {/* /:collectionId means what goes before the match.path, in this case what is next to /shop/ */}
        {/* thanks to this in the CollectionPage we will have access to a new object inside match, params, with will have a property called collectionId (what goes after the : is a param) which value would be the route after /shop (match.path) */}
      </Suspense>
    </div>
  );
};

// we dont need the mapStateToProps here now since we pass the selectors inside the collections containers
// const mapStateToProps = createStructuredSelector({
//   isCollectionsFetching: selectIsCollectionsFetching,
//   isCollectionsLoaded: selectorIsCollectionsLoaded // CAUTION the value we get from the selector is true WHEN THE COLLECTION IS LOADED so in the isLoading prop of the withSpinner components we have to check for !isCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
