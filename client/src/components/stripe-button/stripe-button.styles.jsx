import styled from "styled-components";

export const StripeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OptionText = styled.span`
  cursor: pointer;
  margin-top: -10px;
  margin-bottom: 10px;

  &:hover {
    color: #4285f4;
  }
`;
