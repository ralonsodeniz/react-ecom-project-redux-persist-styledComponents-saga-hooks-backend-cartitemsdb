import styled from "styled-components";

const mainColor = "black";

export const UpdateUserDataContainer = styled.div`
  display: grid;
  justify-content: center;
  /* align-items: center; */
`;

export const UpdateUserDataTitleContainer = styled.h2`
  margin: 10px 0;
`;

export const UpdateUsernameAndPasswordContainer = styled.div`
  label {
    top: -14px !important;
    font-size: 12px !important;
    color: ${mainColor} !important;
  }
`;
