import styled from "styled-components";

export const AccountDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 350px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 35px;
  right: 10px;
  z-index: 5;
`;

export const ImageContainerBorder = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  height: 124px;
  width: 124px;
  background: transparent;
  border: 1px solid black;
  border-radius: 62px;
`;

export const ImageContainer = styled.img`
  position: relative;
  height: 150px;
  clip-path: circle(61px);
  -webkit-clip-path: circle(61px);
  bottom: 14px;
`;

export const AvatarContainer = styled.div`
  align-self: center;
  width: 150px;
  height: 150px;
`;

export const TitleContainer = styled.h3`
  align-self: center;
`;

export const AccountDropdownButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;
