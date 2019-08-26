import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

export const OrderDetailsContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  margin: 50px auto 0;

  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;

export const OrderDetailsHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const HeaderBlockContainer = styled.div`
  text-transform: capitalize;
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 22%;
  }
`;

export const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const OrderTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DateAndAddressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const AddressesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddressContainer = styled.div`
  margin-left: 10px;
`;

export const BackToAccountButton = styled(CustomButton)`
  width: max-content;
  height: min-content;
  margin: auto 0;
`;
