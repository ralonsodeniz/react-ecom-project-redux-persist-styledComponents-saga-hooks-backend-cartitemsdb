import firebase from "firebase/app"; // we import firebase app
import "firebase/firestore"; // we attach to the firebase app the database
import "firebase/auth"; // we attach to the firebase app the auth system
import "firebase/storage"; // we attach to the firebase app the storage system

import { mergeCarts } from "../redux/cart/cart.utils";

const config = {
  // we create the config object we copied from firebase web when we created the app
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

let redirectUrl = "";
if (process.env.NODE_ENV === "development") {
  redirectUrl = process.env.REACT_APP_LOCALHOST;
} else {
  redirectUrl = process.env.REACT_APP_DEPLOY_URL;
}

console.log(redirectUrl);

const actionCodeSettings = {
  url: redirectUrl
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // this is the function we are going to use to crete the users profiles in the db
  if (!userAuth) return; // if there is not user we quit the function

  const userRef = firestore.doc(`users/${userAuth.uid}`); // we create the documentRef
  const snapShot = await userRef.get(); // we create the documentSnapshot

  if (!snapShot.exists) {
    // we check in the snapshot if the user already exists, if it doesn't we create one
    const { displayName, email } = userAuth; // we get the name and email from the google user obejct
    const createdAt = new Date(); // we create the date of registering
    const cartItems = [];
    const avatarUrl = userAuth.photoURL ? userAuth.photoURL : "";
    const addresses = [];
    const orders = {};
    try {
      await userRef.set({
        // we use the documentRef to create the new document in the collection with its properties
        displayName,
        email,
        createdAt,
        cartItems,
        avatarUrl,
        ...additionalData,
        addresses,
        orders
      });
    } catch (error) {
      console.log("error creating user", error);
      throw Error("Ooops something happened while creating the user");
    }
  }
  return userRef; // we may want to use this user reference after
};

// we create a new firebase firestore util to export our shop data to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // we need this function to be async because we want it to the batch to finish before returning if it is resolved or rejected
  // the collectionKey will be the name of the collection and objectsToAdd all the collections object
  const collectionRef = firestore.collection(collectionKey);
  // sice firestore will be adding one collection at a time, we cannot add all the collections in the arrey at a time we need to make sure that all the collections are added, in only one fails we have to abort the process
  // this is called to do a batch and firestore has a batch() method to do this
  const batch = firestore.batch();
  // since we do not need to return an array we do not use map to iterate the array but forEach, that will perform certain actions using every element of the array and it does not return anything unless we say it
  objectsToAdd.forEach(collectionObject => {
    const newDocRef = collectionRef.doc(); // .doc() will tell firebase to give (create) a new document reference in this collection (in the current path) and randomly generate an unique id for it | if inside of doc(string) we pass a string we can set the id we want, for example the collection object title, but we want the unique id
    // now we want to set the collections inside the new documents, which are referenced to the path where they were created in the previous line of code
    // as we want them to be all created or not we use the write batch as
    batch.set(newDocRef, collectionObject);
  });
  // the batch is created but has to be fired (executed) so now we fire it off
  return await batch.commit(); // .commit() returns a promise which its resolved value is null
};

// now we will create a function that gets the whole collection snapshot and treats the data so we transforms it into an object instead of the array we would get with .docs and it is returned as our front end needs it to be
export const convertCollectionsSnapshotToMap = collections => {
  return collections.docs.reduce((accumulator, documentCollection) => {
    // we get the documentSnapshots from the collectionSnapshot .docs properties and using reduce we create the object with the structure we need
    const { title, items } = documentCollection.data(); // we use .data() to get the items inside the document
    accumulator[title.toLowerCase()] = {
      // we are saying to the accumulator objects property with key collection.title to contain the collection itself. for example accumulator = {hats: { title: "hats", routName: "hats", id: "1241kh4141", items: [Array of hats items]}}
      routeName: encodeURI(title.toLowerCase()), // what encodeURI does is you pass it some string and it give you back a string in which any character a url cannot handle or process are converted into a version that the url can actually read | we use it here because routeName is something we are going to use in routing in our urls
      id: documentCollection.id, // id we get it from the document snapshot itslef
      title,
      items
    };
    return accumulator; // since we are introducing a new different property in the object each iteration we don't need to control not to overwrite the previous iteration
  }, {});
};

// this is the same as above but using two iteration methods, map to create the collection object as we need and reduce to return an object with the collections inside instead of an array
// export const convertCollectionSnapshotToMap = collections => {
//   const transformedCollections = collections.docs.map(documentCollection => {
//     const { title, items } = documentCollection.data();
//     return {
//       routeName: encodeURI(title.toLowerCase()),
//       id: documentCollection.id,
//       title,
//       items
//     };
//   });
//   return transformedCollections.reduce((accumulator, collection) => {
//     accumulator[collection.title.toLowerCase()] = collection;
//     return accumulator;
//   }, {});
// };

// util to check if there is a user logged in on App mount
// we have to mimic the functionality we may encounter when we do not have firebase as the backend
// we will use onAuthStateChange to check if there is a user logged in and if so to get it and just after that we close the observable listener
// we need it in a Promise pattern since our sagas need the promise to yield
export const getCurrentUser = () => {
  try {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        // onAuthStateChanged or onSnapshot take a succeed and an optional on error
        unsubscribe(); // we close the listener with the method returned from onAuthStateChanged
        resolve(userAuth); // if we have an user logged in we get the userAuth and we return it, if there is not user logged we will return null as the userAuth will be empty
      }, reject); // if there is any errro we use reject as the second parameter of onAtuhStateChanged so we can catch it with our saga
    });
  } catch (error) {
    console.log("error checking if there is an user authenticated", error);
    throw Error("Ooops something happened while checking users");
  }
};

export const storeCartItems = async (cartItems, userId) => {
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update({ cartItems: cartItems });
  } catch (error) {
    console.log(error, "error updating cart");
    throw Error("Ooops something happened while storing your cart");
  }
};

export const updateCartOnSignIn = async (userAuth, currentCartItems) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  let { cartItems } = userSnapshot.data();
  try {
    if (cartItems === undefined) {
      cartItems = [];
    }
    const mergedCart = mergeCarts(cartItems, currentCartItems);
    return mergedCart;
  } catch (error) {
    console.log("error while updating cart on sign in", error);
    throw Error("Ooops something happened while updating your cart");
  }
};

export const updateAvatarInDB = async url => {
  const userId = auth.currentUser.uid;
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update({ avatarUrl: url });
  } catch (error) {
    console.log(error, "error updating avatar url");
    throw Error("Ooops something happened while updating your avatar");
  }
};

export const addNewAddressInDB = async address => {
  const userId = auth.currentUser.uid;
  const userRef = firestore.doc(`users/${userId}`);
  const userSnapshot = await userRef.get();
  try {
    let { addresses } = userSnapshot.data();
    if (addresses === undefined) {
      addresses = [];
    }
    const newAdresses = [...addresses, address];
    await userRef.update({ addresses: newAdresses });
  } catch (error) {
    console.log("failed to add new address", error);
    throw Error("Ooops something happened while adding your new address");
  }
};

export const removeAddressInDB = async address => {
  const userId = auth.currentUser.uid;
  const userRef = firestore.doc(`users/${userId}`);
  const userSnapshot = await userRef.get();
  try {
    const { addresses } = userSnapshot.data();
    const newAdresses = addresses.filter(
      currentAddress => currentAddress.addressName !== address.addressName
    );
    await userRef.update({ addresses: newAdresses });
  } catch (error) {
    console.log("failed to remove address", error);
    throw Error("Ooops something happened while removing your address");
  }
};

export const updateUserDataInDB = async userCredentials => {
  const user = auth.currentUser;
  const userId = user.uid;
  const userRef = firestore.doc(`users/${userId}`);
  const userSnapshot = await userRef.get();
  const userData = userSnapshot.data();
  const storedDisplayName = userData.displayName;
  const storedEmail = userData.email;
  let { displayName, email, password } = userCredentials;
  let newEmail = false;
  let newDisplayName = false;
  try {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    await user.reauthenticateWithCredential(credentials);
    if (displayName !== "" && displayName !== storedDisplayName) {
      await user.updateProfile({ displayName }); // here we pass an object because we have different properties inside user profile
      await userRef.update({ displayName });
      newDisplayName = true;
    } else {
      displayName = storedDisplayName;
    }
    if (email !== "" && email !== storedEmail) {
      await user.updateEmail(email);
      await auth.currentUser.sendEmailVerification(actionCodeSettings);
      await userRef.update({ email });
      newEmail = true;
    } else {
      email = storedEmail;
    }
  } catch (error) {
    console.log("failed to update user data", error);
    throw Error("Ooops something happened while updating your data");
  }
  return { displayName, email, newDisplayName, newEmail };
};

export const storeOrderInDB = async ({ order, price, billingAddress }) => {
  const userId = auth.currentUser.uid;
  const userRef = firestore.doc(`users/${userId}`);
  const userSnapshot = await userRef.get();
  try {
    const { orders, addresses } = userSnapshot.data();
    let newOrders = {};
    if (orders !== null) {
      newOrders = { ...orders };
    }
    const newOrderDate = new Date();
    const newOrderKey = `${newOrderDate.getFullYear()}${newOrderDate.getMonth() +
      1}${newOrderDate.getDate()}${newOrderDate.getHours()}${newOrderDate.getMinutes()}${newOrderDate.getSeconds()}`;
    let orderMonth = "";
    switch (newOrderDate.getMonth()) {
      case 0:
        orderMonth = "January";
        break;
      case 1:
        orderMonth = "February";
        break;
      case 2:
        orderMonth = "March";
        break;
      case 3:
        orderMonth = "April";
        break;
      case 4:
        orderMonth = "May";
        break;
      case 5:
        orderMonth = "June";
        break;
      case 6:
        orderMonth = "July";
        break;
      case 7:
        orderMonth = "August";
        break;
      case 8:
        orderMonth = "September";
        break;
      case 9:
        orderMonth = "October";
        break;
      case 10:
        orderMonth = "November";
        break;
      case 11:
        orderMonth = "December";
        break;
      default:
        break;
    }
    newOrders[newOrderKey] = {
      date: {
        year: newOrderDate.getFullYear(),
        month: orderMonth,
        day: newOrderDate.getDate(),
        hour: newOrderDate.getHours(),
        minutes: newOrderDate.getMinutes()
      },
      items: order,
      total: price,
      address: addresses[0],
      billingAddress
    };
    await userRef.update({ orders: newOrders });
    return newOrders;
  } catch (error) {
    console.log("filed to update orders", error);
    throw Error("Ooops something happened while storing your order");
  }
};

export const updateDefaultAddressInDB = async addressIndex => {
  const userId = auth.currentUser.uid;
  const userRef = firestore.doc(`users/${userId}`);
  const userSnapshot = await userRef.get();
  try {
    const { addresses } = userSnapshot.data();
    let newAddresses = addresses;
    const newDefaultAddress = newAddresses.splice(addressIndex, 1);
    newAddresses.unshift(...newDefaultAddress);
    await userRef.update({ addresses: newAddresses });
  } catch (error) {
    console.log("failed to update default address");
    throw Error("Ooops something happened while changing your default address");
  }
};

export const updatePasswordInDB = async passwordCredentials => {
  const user = auth.currentUser;
  const { newPassword, password } = passwordCredentials;
  try {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    await user.reauthenticateWithCredential(credentials);
    await user.updatePassword(newPassword);
  } catch (error) {
    console.log("failed to update password", error);
    throw Error("Ooops something happened while changing your password");
  }
};

export const deleteUserInDB = async deleteCredentials => {
  const { currentUserSignUpEmailAndPAss } = deleteCredentials;
  const user = auth.currentUser;
  const userId = user.uid;
  try {
    if (currentUserSignUpEmailAndPAss) {
      const { password } = deleteCredentials;
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );
      await user.reauthenticateWithCredential(credentials);
    } else {
      await user.reauthenticateWithPopup(googleProvider);
    }
    await firestore.doc(`users/${userId}`).delete();
    await user.delete();
    await auth.signOut();
  } catch (error) {
    console.log("failed to delete user", error);
    throw Error("Ooops something happened while deleting your user");
  }
};

export const sendNewVerificationEmail = async userCredentials => {
  const { email, password } = userCredentials;
  let alreadyVerified = false;
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    if (
      !user.emailVerified &&
      // we check if the user was created with email and password
      user.providerData
        .map(provider => provider.providerId)
        .includes("password")
    ) {
      await auth.currentUser.sendEmailVerification(actionCodeSettings);
    } else {
      alreadyVerified = true;
    }
  } catch (error) {
    console.log("failed to send a new verification email", error);
    throw Error(
      error.message ||
        "Ooops something happened while trying to send you a new verification email"
    );
  }
  await auth.signOut();
  return alreadyVerified;
};

export const resetPassword = async email => {
  try {
    await auth.sendPasswordResetEmail(email, actionCodeSettings);
  } catch (error) {
    console.log("failed to send the password reset email");
    throw Error(
      error.message ||
        "Ooops something happened while trying to reset your password"
    );
  }
};

firebase.initializeApp(config); // we initialize the App using the config object

export const auth = firebase.auth(); // we start to config the auth process
export const firestore = firebase.firestore(); // we start the config of the db
export const storage = firebase.storage(); // we create the storage object

// start with google auth
export const googleProvider = new firebase.auth.GoogleAuthProvider(); // this give us acceess to google auth provider
googleProvider.setCustomParameters({ prompt: "select_account" }); // here we set custom parameters of the google auth | prompt: "select_account" we want to always trigger the google pop up for auth and sign in
// we are not using this function now since we are doing this process inside the user signin with google saga
// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider); // this sets that we want to signin with the google pop up

export default firebase;
