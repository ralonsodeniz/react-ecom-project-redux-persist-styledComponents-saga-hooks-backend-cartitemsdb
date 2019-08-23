import styled from "styled-components";

export const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

export const ImageContainerBorder = styled.div`
  height: 150px;
  background: black;
  clip-path: circle(62px);
  -webkit-clip-path: circle(62px);
  margin-bottom: 10px;
`;

export const ImageContainer = styled.img`
  height: 150px;
  margin-bottom: 10px;
  clip-path: circle(61px);
  -webkit-clip-path: circle(61px);
`;

export const ButtonsContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

export const InputFileContainer = styled.input`
  border: 0;
  clip-path: rect(0, 0, 0, 0);
  height: 0.1px;
  width: 0.1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  opacity: 0;
`;

export const LableFileContainer = styled.label`
  display: flex;
  align-items: center;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  text-align: center;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  justify-content: center;
  overflow: hidden;
  margin: 1px;
  background-color: black;
  color: white;
  border: 1px solid transparent;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
