import styled from "styled-components";

export const AccountPageContainer = styled.div`
  width: 850px;
  display: grid;
  /* justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center; */
  margin: 30px auto;
  row-gap: 50px;
  grid-template: auto / 1.25fr 1fr;
  grid-template-areas:
    "avatar addresses"
    "userData addresses"
    "orders addresses";

  @media screen and (max-width: 800px) {
    width: unset;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "avatar"
      "userData"
      "orders"
      "addresses";
  }
`;

export const UploadImageContainer = styled.div`
  grid-area: avatar;
`;

export const UserAdressesContainer = styled.div`
  grid-area: addresses;
`;

export const UserDataContainer = styled.div`
  grid-area: userData;
`;
