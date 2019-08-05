import React from "react";

import {
  CartItemContainer,
  CartItemImageContainer,
  ItemDetailsContainer
} from "./cart-item.styles";
// import "./cart-item.styles.scss"

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImageContainer src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>
        {quantity} x {price} €
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default React.memo(CartItem);
