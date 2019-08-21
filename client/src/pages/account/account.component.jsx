import React from "react";

import UploadImage from "../../components/upload-image/upload-image.component";

import {
  AccountPageContainer,
  UploadImageContainer,
  UserAdressesContainer,
  UserDataContainer
} from "./account.styles";
import UserAddresses from "../../components/user-addresses/user-addresses.component";
import UpdateUserdata from "../../components/update-userdata/update-userdata.component";

const AccountPage = () => (
  <AccountPageContainer>
    <UploadImageContainer>
      <UploadImage imageType={"avatar"} />
    </UploadImageContainer>
    <UserAdressesContainer>
      <UserAddresses />
    </UserAdressesContainer>
    <UserDataContainer>
      <UpdateUserdata />
    </UserDataContainer>
  </AccountPageContainer>
);

export default AccountPage;
