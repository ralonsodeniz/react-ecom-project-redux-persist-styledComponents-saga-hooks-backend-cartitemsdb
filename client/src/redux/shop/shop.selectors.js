import { createSelector } from "reselect";

// input selector
const selectShop = state => state.shop;

// output selectors
export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (
    collections // since we do not get the collections from the firestore until we render the shop page we need to return something in the selector before this happens so we return an empty array as a placeholeder
  ) =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
  // Object.keys(object) returns an array with the keys of the object
  // we use it so we can create an array with the objects of the different collections by using map over object.keys resulting array
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => (collections ? collections[collectionUrlParam] : null) // same as above we cannot select an specific collection if the collections have not being fetched yet from the db so in that case we return null, since the collection is an object
  );

export const selectIsCollectionsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectorIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections // this checks if collections property is either null (it returns false) or there are objects (it returns true)
);
