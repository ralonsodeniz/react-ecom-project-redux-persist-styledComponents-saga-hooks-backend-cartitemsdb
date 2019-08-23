import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

export const UserAddressesContainer = styled.div`
  display: grid;
`;

export const NewDAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SavedAddressesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 16px 0;
`;

export const AddressTitle = styled.h5`
  display: flex;
  font-size: 18px;
  width: 100%;
  margin-bottom: 5px;
`;

export const DefaultAddressLabel = styled.label`
  display: flex;
  align-items: center;
  width: min-content;
  height: auto;
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
`;

export const AddressContent = styled.span`
  font-size: 16px;
`;
