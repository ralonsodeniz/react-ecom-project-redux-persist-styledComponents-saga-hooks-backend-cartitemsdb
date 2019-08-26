import React from "react";
import { connect } from "react-redux";

import { selectCurrentUserOrder } from "../../redux/user/user.selectors";
import OrderItem from "../../components/order-item/order-item.component";

import {
  OrderDetailsContainer,
  OrderDetailsHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  OrderTitleContainer,
  DateAndAddressContainer,
  BackToAccountButton,
  AddressContainer,
  AddressesContainer
} from "./order-details.styles";

const OrderDetails = ({ order, match, history }) => (
  <OrderDetailsContainer>
    <OrderTitleContainer>
      <h2>{`Order id: ${match.params.orderId}`}</h2>
      <BackToAccountButton onClick={() => history.push("/account")}>
        back to account
      </BackToAccountButton>
    </OrderTitleContainer>
    <DateAndAddressContainer>
      <div>
        <h3>Order date</h3>
        <strong>Year:</strong> {order.date.year} <br />
        <strong>Month:</strong> {order.date.month} <br />
        <strong>Day:</strong> {order.date.day} <br />
        <strong>Time:</strong> {order.date.hour}:
        {order.date.minutes > 10
          ? order.date.minutes
          : `0${order.date.minutes}`}
      </div>
      <AddressesContainer>
        <AddressContainer>
          <h3>Order address</h3>
          <strong>{order.address.addressName}</strong> <br />
          {order.address.street} - {order.address.postcode} <br />
          {order.address.city} - {order.address.country} <br />
        </AddressContainer>
        <AddressContainer>
          <h3>Billing address</h3>
          <strong>{order.billingAddress.addressName}</strong> <br />
          {order.billingAddress.street} - {order.billingAddress.postcode} <br />
          {order.billingAddress.city} - {order.billingAddress.country} <br />
        </AddressContainer>
      </AddressesContainer>
    </DateAndAddressContainer>
    <OrderDetailsHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
    </OrderDetailsHeaderContainer>
    {order.items.map(item => (
      <OrderItem key={item.id} item={item} />
    ))}
    <TotalContainer>
      <span>TOTAL: {order.total}€</span>
    </TotalContainer>
  </OrderDetailsContainer>
);

const mapStateToProps = (state, ownProps) => ({
  order: selectCurrentUserOrder(ownProps.match.params.orderId)(state)
});

export default connect(mapStateToProps)(OrderDetails);
