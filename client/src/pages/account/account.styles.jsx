import styled from "styled-components";

export const AccountPageContainer = styled.div`
  width: 850px;
  display: grid;
  /* justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center; */
  margin: 30px auto;
  grid-template: 1fr 1fr / 1.25fr 1fr;
  grid-template-areas:
    "avatar directions"
    "userData directions";

  @media screen and (max-width: 800px) {
    width: unset;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "avatar"
      "directions"
      "userData"
      "directions";
  }
`;

export const UploadImageContainer = styled.div`
  grid-area: avatar;
`;
