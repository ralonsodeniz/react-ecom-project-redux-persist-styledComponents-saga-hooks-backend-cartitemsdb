// inside styled components library exists a method called createGlobalStyle
import { createGlobalStyle } from "styled-components";

// this component we create using createGlobalStyle is called on our App.js and apply the styles globally
// we are going to add media querys to make the app more responsive to mobiles
// media querys go inside the selector we want to modify depending on the screen size
export const GlobalStyle = createGlobalStyle`
/* To add a font we first go to google fonts and copy the html link and we put it in the index.htmnl and then we set the font as font-family in the element we want, in this case the body */
body {
  font-family: "Open Sans Condensed", sans-serif;
  padding: 20px 40px; /* 20px top bottom 80px left and right */

  @media screen and (max-width: 800px) { /* we only want this block to render when the conditions inside () are fullfiled | in this case anything bellow 800px with gets this styles anything above doesnt */
    padding: 10px;
  }
}

a {
  /* this is for the Links component not to have the aspect of an anchor. We could have done this in the header.styles.scss under .option classname but we want this to apply to every anchor tag (Link component is rendered as an anchor tag) */
  text-decoration: none;
  color: black;
}

* {
  box-sizing: border-box;
}
`;
