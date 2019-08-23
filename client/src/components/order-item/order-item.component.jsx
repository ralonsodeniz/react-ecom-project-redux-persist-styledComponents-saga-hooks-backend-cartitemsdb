import React from "react";

import {
  OrderItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer
} from "./order-item.styles";
// import "./checkout-item.styles.scss";

const OrderItem = ({ item }) => {
  // if we destructure properties from cartItem in the function parameters we do not have access to cartItem itslef, thats why we destructure cartItem from props and then inside the function before the return we deconstruct the properties of cartItem we want
  const { name, imageUrl, price, quantity } = item;
  return (
    <OrderItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <span>{quantity}</span>
      </QuantityContainer>
      <TextContainer>{price}€</TextContainer>
    </OrderItemContainer>
  );
};

export default OrderItem;
