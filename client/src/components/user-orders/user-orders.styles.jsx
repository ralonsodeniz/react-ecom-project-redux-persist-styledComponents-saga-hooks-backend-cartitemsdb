import styled from "styled-components";

export const UserOrdersContainer = styled.div`
  display: grid;
  justify-content: stretch;
  width: 234px;
`;

export const UserOrdersTitleContainer = styled.h2`
  margin: 10px 0;
  display: block;
  width: 100%;
`;

export const UserOrdersListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 16px 0;
`;

export const OrderTitle = styled.h5`
  display: flex;
  font-size: 18px;
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
`;
