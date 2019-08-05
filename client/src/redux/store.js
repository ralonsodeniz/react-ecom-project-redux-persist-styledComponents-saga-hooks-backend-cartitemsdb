import { createStore, applyMiddleware } from "redux"; // createStore() creates the store using the root reducer and the middleware we want to use, to use the middleware we use applyMiddleware() method
import logger from "redux-logger"; // this is a middleware that is nice to use when debugging our redux code
import { persistStore } from "redux-persist"; // this allows our browser to cache our store depending on the config options we set
// with the implementation of saga we dont use thunk anymore, async actions will be managed by sagas
// import thunk from "redux-thunk"; // thunk is a middleware to allows us to fire async functions
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer"; // we need the root reducer to create the store
import rootSaga from "./root-saga"; // we import the root saga and now we use it instead of individuals sagas we want to use as middleware

//we create the saga middleware
const sagaMiddleware = createSagaMiddleware(); // this can take an object with configuration that we don't need now

const middlewares = [sagaMiddleware]; // we create an array with all the middlewares we want to use so then we can spread this array as the parameter of applyMiddleware method so each of them is passed as a parameter.
// this makes it easier to add new middlewares just by adding them to the array
// in our case, for logger, since we only want it to be applied in development enviorment we push it conditionally
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// after applyMiddleware is called we are going to run and add in the individuals saga that we are going to run
sagaMiddleware.run(rootSaga); // inside of run we pass each individual saga

// we create a persistor, which calls the persistStore() passing our store as parameter
export const persistor = persistStore(store); // this is a persistant version of our store
// using persistor and store is how we are going to create the new Provider that is wrapping our application

// as we now have more than one thing to export we export them separately instead of one by default
