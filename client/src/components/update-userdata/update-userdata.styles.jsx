import styled from "styled-components";

const mainColor = "black";

export const UpdateUserDataContainer = styled.div`
  display: grid;
`;

export const UpdateUserDataTitleContainer = styled.h2`
  margin: 10px 0;
`;

export const UpdateUsernameAndPasswordContainer = styled.div`
  input[name="displayName"] + label,
  input[name="email"] + label {
    top: -14px !important;
    font-size: 12px !important;
    color: ${mainColor} !important;
  }
`;

export const DeleteUserContainer = styled.div`
  margin-bottom: 20px;
`;
