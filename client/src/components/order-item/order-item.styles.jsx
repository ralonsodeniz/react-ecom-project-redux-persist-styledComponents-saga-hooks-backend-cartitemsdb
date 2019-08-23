import styled from "styled-components";

export const OrderItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }
`;

export const TextContainer = styled.span`
  width: 23%;
  justify-self: center;
  align-self: center;
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  justify-self: center;

  span {
    margin: 0 10px;
  }

  div {
    cursor: pointer;
  }
`;
