import React from "react";

import UploadImage from "../../components/upload-image/upload-image.component";

import { AccountPageContainer, UploadImageContainer } from "./account.styles";

const AccountPage = () => (
  <AccountPageContainer>
    <UploadImageContainer>
      <UploadImage imageType={"avatar"} />
    </UploadImageContainer>
  </AccountPageContainer>
);

export default AccountPage;
