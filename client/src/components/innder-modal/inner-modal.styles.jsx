import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

export const InnerModalContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerModalMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 10px 18px #888888;
  border: 1px solid black;
  border-radius: 10px;
`;

export const InnerModalText = styled.h3`
  padding: 0px 20px;
`;

export const InnerModalButton = styled(CustomButton)`
  margin-bottom: 30px;
  border: 1px solid black;
  @media screen and (max-width: 800px) {
    width: auto;
    height: auto;
  }
`;
