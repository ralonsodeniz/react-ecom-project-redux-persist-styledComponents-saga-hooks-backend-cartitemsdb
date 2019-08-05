import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from "./collection-preview.styles";
// import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, history, match, routeName }) => {
  return (
    <CollectionPreviewContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${routeName}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((item, itemIndex) => itemIndex < 4) // we do the filter so we only show 4 items in the collection preview
          .map(item => {
            return <CollectionItem key={item.id} item={item} />;
          })}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;
