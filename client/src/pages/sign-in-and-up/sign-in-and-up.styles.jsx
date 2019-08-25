import styled from "styled-components";

export const SignInAndUpContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: unset;
    align-items: center;

    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;

export const SigInContainer = styled.div`
  flex-direction: column;
  align-items: center;
`;

export const OptionTextContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const OptionText = styled.span`
  cursor: pointer;

  &:hover {
    color: #4285f4;
  }
`;
