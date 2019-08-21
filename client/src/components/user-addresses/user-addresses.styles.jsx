import styled from "styled-components";

export const UserAddressesContainer = styled.div`
  display: grid;
  justify-content: center;

  @media screen and (max-width: 800px) {
    margin-top: -61px;
  }
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
`;

export const RemoveButtonContainer = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

export const AddressContent = styled.span`
  font-size: 16px;
`;
