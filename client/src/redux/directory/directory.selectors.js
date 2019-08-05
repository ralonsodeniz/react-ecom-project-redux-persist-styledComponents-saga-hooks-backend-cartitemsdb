import { createSelector } from "reselect";

// input selector. just 1 level deep into the state to select the reducer
// remember input selectors does not use createSelector
const selectDirectory = state => state.directory;

// output selectors
export const selectDirectorySections = createSelector(
  [selectDirectory], // array of selectors
  directory => directory.sections // callback with the returned item of the array of selectors as parameter and what we want to return
);
