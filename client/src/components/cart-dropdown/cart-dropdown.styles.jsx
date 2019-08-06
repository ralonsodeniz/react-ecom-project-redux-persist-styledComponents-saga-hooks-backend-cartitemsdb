import styled from "styled-components";
import CustomButton from "../custom-button/custom-button.component";

export const CartDropdownComponent = styled.div`
  position: absolute;
  width: 240px;
  height: 380px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const CartDropDownButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const CartDropdownButton = styled(CustomButton)`
  margin: 1px;
`;

export const CartDropdownClearButton = styled(CartDropdownButton)`
  background-color: red;
  height: 25px;
`;

export const CartItemsComponent = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
