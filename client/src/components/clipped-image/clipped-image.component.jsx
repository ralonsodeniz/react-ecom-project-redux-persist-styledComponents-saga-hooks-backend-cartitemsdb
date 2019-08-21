import React from "react";

import { ImageContainerBorder, ImageContainer } from "./clipped-image.styles";

const ClippedImage = ({ url, imageType }) => (
  <ImageContainerBorder>
    <ImageContainer src={url} alt={imageType} />
  </ImageContainerBorder>
);

export default ClippedImage;
