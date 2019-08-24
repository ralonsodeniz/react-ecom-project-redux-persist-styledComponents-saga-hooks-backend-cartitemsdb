import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

export const UserAddressesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NewDAddressContainer = styled.div`
  width: max-content;
  margin: 40px;
`;

export const SavedAddressesContainer = styled.div`
  margin: 40px;
`;

export const CurrentAddressesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-template-rows: 1fr; /* we define the size of the rows, if we dont define the property for every row it will get the default */
  column-gap: 16px;
`;

export const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  padding: 16px 0;
`;

export const AddressTitle = styled.h5`
  display: flex;
  font-size: 18px;
  width: max-content;
  margin-bottom: 5px;
`;

export const DefaultAddressLabel = styled.label`
  display: flex;
  align-items: center;
  width: max-content;
  height: min-content;
  letter-spacing: 0.5px;
  text-align: center;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  justify-content: center;
  overflow: hidden;
  background-color: black;
  color: white;
  border: 1px solid transparent;
  margin-top: 1px;
`;

export const MakeDefaultAddressButton = styled(CustomButton)`
  width: max-content;
  height: min-content;

  &:hover {
    border: 1px solid black;
  }
`;

export const RemoveButtonContainer = styled.div`
  margin-left: auto;
  cursor: pointer;
  padding-left: 10px;
`;

export const AddressContent = styled.span`
  font-size: 16px;
`;
