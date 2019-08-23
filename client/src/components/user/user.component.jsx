import React from "react";

import UploadImage from "../../components/upload-image/upload-image.component";
import UserAddresses from "../../components/user-addresses/user-addresses.component";
import UpdateUserdata from "../../components/update-userdata/update-userdata.component";
import UserOrders from "../../components/user-orders/user-orders.component";

import {
  AccountPageContainer,
  UploadImageContainer,
  UserAdressesContainer,
  UserDataContainer,
  UserOrdersContainer
} from "./user.styles";

const UserInfo = props => (
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
    <UserOrdersContainer>
      <UserOrders {...props} />
    </UserOrdersContainer>
  </AccountPageContainer>
);

export default UserInfo;
