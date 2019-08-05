import styled from "styled-components";

export const MenuItemContainer = styled.div`
  min-width: 30%;
  height: ${({ size }) => (size ? "380px" : "240px")};
  flex: 1 1 auto; /* this will make the width to grow or shrink to adapt to the size of the flex row */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden; /* this allows us to have a background-image that grows but that is not going outside the boundaries of the parent div */

  &:hover {
    cursor: pointer;

    & .background-image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & .content {
      /* putting & .classname appears to be the same as only putting .classname indented be careful that you need the space if not is like concatening */
      opacity: 0.9;
    }
  }

  &:first-child {
    /* & means to the class above add the modifier, in this case first-child */
    /* this is the same as writting .menu-item:first-child */
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  @media screen and (max-width: 800px) {
    /* media querys selector has the higher priority */
    height: 200px;
  }
`;

export const BackgroundImageContainer = styled.div`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
`;

export const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
`;

export const TitleContainer = styled.h1`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  color: #4a4a4a;
`;
export const SubtitleContainer = styled.span`
  font-weight: lighter;
  font-size: 16px;
`;
