import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUserOrders } from "../../redux/user/user.selectors";

import {
  UserOrdersContainer,
  UserOrdersTitleContainer,
  UserOrdersListContainer,
  OrderContainer,
  OrderTitle
} from "./user-orders.styles";

const UserOrders = ({ orders, history, match }) => {
  console.log(orders);
  return (
    <UserOrdersContainer>
      <UserOrdersTitleContainer>User orders</UserOrdersTitleContainer>
      <UserOrdersListContainer>
        {Object.entries(orders).map((
          [key, value] // Object.entries returns an array of [key, value] for each entry in the object
        ) => (
          <OrderContainer key={key}>
            <OrderTitle onClick={() => history.push(`${match.path}/${key}`)}>
              {`Order date : ${value.date.year}, ${value.date.month} ${
                value.date.day
              }`}
            </OrderTitle>
            Items : {value.items.length} <br />
            Price : {value.total}
          </OrderContainer>
        ))}
      </UserOrdersListContainer>
    </UserOrdersContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: selectCurrentUserOrders
});

export default connect(mapStateToProps)(UserOrders);
