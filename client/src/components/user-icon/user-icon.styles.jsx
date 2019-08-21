import styled from "styled-components";

import { ReactComponent as UserIcon } from "../../assets/user.svg";

export const UserIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const UserLogoContainer = styled(UserIcon)`
  width: 24px;
  height: 24px;
`;
