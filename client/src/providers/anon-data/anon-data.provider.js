import React, { createContext, useState } from "react";

export const AnonDataContext = createContext({
  anonData: {
    name: "",
    email: "",
    street: "",
    postcode: "",
    city: "",
    country: ""
  },
  assignNewAnonData: () => {},
  clearAnonData: () => {}
});

const AnonDataProvider = ({ children }) => {
  const INITIAL_ANON_DATA = {
    name: "",
    email: "",
    street: "",
    postcode: "",
    city: "",
    country: ""
  };

  const [anonData, setAnonData] = useState(INITIAL_ANON_DATA);

  const assignNewAnonData = newData => {
    setAnonData({ ...newData });
  };

  const clearAnonData = () => {
    setAnonData(INITIAL_ANON_DATA);
  };

  return (
    <AnonDataContext.Provider
      value={{
        anonData,
        assignNewAnonData,
        clearAnonData
      }}
    >
      {children}
    </AnonDataContext.Provider>
  );
};

export default AnonDataProvider;
