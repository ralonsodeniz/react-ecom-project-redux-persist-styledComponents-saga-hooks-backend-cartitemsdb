import React from "react";
import ReactDOM from "react-dom";
// this is the routing package for react, it is going to allow us to mimic pages in order to have different routes inside our app like in a ssr app
import { BrowserRouter } from "react-router-dom"; // BrowserRouter is going to wrap our application and gives it all of the functionalities of routing the library provides
// Provider is what gives to our application access to not only the store but also to the reducers we are going to set up
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // this is the component we need to give our app access to persistant store
import { store, persistor } from "./redux/store"; // we import also the persistor from store not just the store
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // Provider has to wrap the entire application for it to have access to redux store and reducers
  // Provider is a component that is going to be the parent of everything inside the application and as the parent it is going to allow the rest of the components to access what redux provides including the store
  <Provider store={store}>
    {/* we need to pass the store as Provider's props so it is available to all the app wrapped between the Provider */}
    <BrowserRouter>
      {/* we wrap our app in the PersistGate component and pass to it the persistor */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
