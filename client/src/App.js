import React, { useEffect, lazy, Suspense } from "react"; // lazy for dynamic imports
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import HomePage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
// import SignInAndUpPage from "./pages/sign-in-and-up/sign-in-and-up.component";
// import CheckoutPage from "./pages/checkout/checkout.component";
// we dont need firebase utils anymore in App.js since we are doing all the auth related code in sagas
// import {
//   auth,
//   createUserProfileDocument
//   // addCollectionAndDocuments only needed to update the collections in the firestore
// } from "./firebase/firebase.utils"; // we need this to make our app aware of a google auth process
import { checkUserSession } from "./redux/user/user.action"; // in order to dispatch the action and be able to use it as a prop we need to import it
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors"; | we only need this selector when we need to udpate collections in firestore | this selector returns an array with the objects of the different collections

// import "./App.css"
import { GlobalStyle } from "./global.styles";

// we declare the const component that we want to dynamically import and wrap it in lazy
// lazy give us a functintion that calls the import to the route of the component we want dynamically import
// this will replace the static import of HomePage
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndUpPage = lazy(() =>
  import("./pages/sign-in-and-up/sign-in-and-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
// because this is an async fucntion, depending on how fast the server is the user can encounter a blank page or even an error for a while during the lazy chunk is being loaded
// Thats why we need to use use Suspense
// Suspense is a new react component that allows us to wrap any part of our application that may be rendering asyncs components, lazy loaded components
// Suspense takes a fallback property that is something to render meanwhile the lazy component is being rendered
// Suspense can wrap multiple components that are being lazy loaded

const App = ({ checkUserSession, currentUser }) => {
  // since we don't need state anymore nor to use the props inside the constructor  we don't need them

  // <- WE ARE CHANGING OUR AUTH CODE TO ADDAPT IT INTO SAGAS ->
  // we create the methods to close the listeners we open have a channel to communicate with the db for different pourposes
  // unsubscribeFromAuth = null;
  // unsubscribeFromSnapshot = null; // we will have to close the listener that we are going to start to know when a new snapshot is done

  // componentDidMount() {
  // const { setCurrentUser } = this.props; //     const { setCurrentUser, collectionsArray } = this.props; we only need collectionsArray when we use addCollectionAndDocuments() to update collections document in firestore
  // this is a method in the auth library that registers when a user changes in the firebase auth
  // it's going to be a async since we potentially have to do api calls to our db to get the users registered
  // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   // here we execute auth.onAuthStateChanged() and store what it returns, that is an unsubscribe function that ends the listener
  //   if (userAuth) {
  //     // we check if t he userAuth object is not null
  //     const userRef = await createUserProfileDocument(userAuth); // we save the returned userRef object from the firestore with the id of the user that has loggedin
  //     this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
  //       // onSnapshot, as onAuthStateChanged, adds a listener for documentSnapshot and triggers an action when it happens
  //       // we are replacing this.setState({currentUser:{whatever}}) evrywhere we want to update currentUser in the store with this.props.setCurrentUser({whatever}) (we dont need the currentUser neither because thets what the action modifies itself) since thats what this action does
  //       setCurrentUser({
  //         id: snapShot.id, // we get the id of the registered user from the documentSnapshot
  //         ...snapShot.data() // since the properties of the docuemnt are not in the documentSnapshot we get them with the .data() method of documentSnapshot and we spread it into the currentUser object from the state
  //       });
  //     });
  //   } else {
  //     setCurrentUser(userAuth); // if the user logs out or it is null because any other reason we set the currentUser to null (we know in this case userAuth is going to be null)
  //   }
  //   // we use this function to update our collection only when we know we have made changes to it in the shop.data.js
  //   // if we leave it unccommented everytime we load the app new documents would be added to the collection
  //   // when we update the shop data we have to remove the documents inside the collections collection and then run this function once
  //   // addCollectionAndDocuments(
  //   //   "collections", // name of the collection we want to create
  //   //   collectionsArray.map(({ title, items }) => ({ title, items })) // we don't need all the elements inside the collections just the title and the items so we create a new array in which we get the title and items of the collection in each iteration and return a new array of objects with those two properties
  //   // );
  // });
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth(); // and then we use it in the componentWillUnmount to close the subscription
  //   this.unsubscribeFromSnapshot();
  // }
  // <- END OF ASYNC CODE WITHOUT SAGAS ->

  // we replace componentDidMount with useEffect
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]); // react hooks demands checkUserSessions to be in the array since it is a dependency of the function, since it is a user action function that does not change its ok, we will have to check what to do when it is a property that comes from a parent component because it is different
  // this will only load when the component is mount since checkUserSession is not going to change

  // componentDidMount() {
  //   checkUserSession();
  // }

  return (
    <div>
      {/* first component we add is the GlobalStyle component to apply the styles inside globally */}
      <GlobalStyle />
      <Header />
      <Switch>
        {/* if anything between the error boundary ever breaks it will be catched by it and will show the alternative render until it is solved */}
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            {/* we keep /shop without exact because we want it to be rendered when we access to pages derivated from shop as /shop/hats etc to for example fetch our collection data from firestore */}
            {/* the shop page is rendered and ontop of it renders the components of the categoryId */}
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndUpPage />
              }
            />
            {/* what we have done here is to conditionally render one of two components depending if currentUser exists or not */}
            {/* <Redirect> router component allow us to change the path of a route to a new one so we can avoid to show sign in page when a user is logged in */}
            <Route exact path="/checkout" component={CheckoutPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview | we only need collectionsArray: selectCollectionsForPreview when we use addCollectionAndDocuments() to update collections document in firestore
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()) // dispatch is a way for redux to know that whatever you pass to this function is going to be an action object that is going to be passed to every reducer
  // we returning an object which its property is a function that dispatchs the action with the requested parameter, in this case the user
  // once we need to use the action inside the component we will do this.props.setCurrentUser(user)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
