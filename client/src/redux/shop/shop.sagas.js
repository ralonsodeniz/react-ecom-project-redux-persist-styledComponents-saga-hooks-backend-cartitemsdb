// this file is going to hold all our saga code related to the shop
// we move all the functionalities we have related to the fetch collection async into the saga using the generator function style
// we are going to import in certains effects that allows to do different things with either the store, like creating actions or listening for actions
import { takeLatest, call, put, all } from "redux-saga/effects"; // takeEvery listen for every action of an specific type we pass to it
// we are replacing takeEvery with takeLatest because we dont want to have more than one fetch collections db at the same time
// we use takeLatest instead takeLeading since it is more probable that the latest request will get the most updated db
// call is an effect that is used to invoque functions, is another way to defer to saga the control of the app and cancel the task if it is needed
// put is the same as dispatch for thunk

import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

// this is the generator function that is going to do the async code
// all generator functions must have yield in it
// we are going to use the sync actions from shop actions in our fetchCollectionsAsync async saga
export function* fetchCollectionsAsync() {
  try {
    // we get the colletions collection reference pbject
    const collectionRef = firestore.collection("collections");
    // using yield we get the collection snapshot object and pause the execution of the code, the promsise get() returns is stored in the value of the creator object assigned to snapshot
    const snapshot = yield collectionRef.get();
    // yield will assure us that we wait until the convertion is finished and call give the saga control over this task.
    // call() first parameter is the funcion, consecutive parameters are the arguments of the funcion
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // sagas do not dispatch actions using the dispatch keyword, they use put
    // put also has to be yielded
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
  // we use yield in combination with sagas effects in the parts of the code where we want to have control and defer it to sagas
}

// we create our first saga using the generator functions
// it is going to listen whenever an specific action type we want comes in and execute another saga when this happens
// this is going to be a saga middleware we add to the store
export function* fetchCollectionsStart() {
  // the first parameter for takeEvery is the action type to listen, the second is another generator function that runs in response of the type action we are listening for
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

// root shop saga
export function* shopSaga() {
  yield all([call(fetchCollectionsStart)]);
}

// we have seen that generator functions pause when they see the yield keyword, after executing the code of that line, and waits for .next() to continue
// but what sagas do is to run all this sagas concurrently, concurrently meaning it wants to run them all toghether in a way it does not block the execution
// sagas takes care of the .next() method from funtions generator with its effects
// takeEvery creates a non blocking call in order to not stop the application in order to be able to run another sagas or do what the user wants to do
// whenever we cast the saga is like a task that is running in the background by the saga middleware
// we can even cancel those tasks
// the saga is who is going to control if a task initializated by takeEvery has to be processed o cancelled
// yield is what give us control of this sagas
