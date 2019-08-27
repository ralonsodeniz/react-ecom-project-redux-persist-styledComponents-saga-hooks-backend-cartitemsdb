import { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  const modal = document.querySelector("#modal");
  const element = document.createElement("div");

  useEffect(() => {
    modal.appendChild(element);
    return () => {
      modal.removeChild(element);
    };
  }, [element, modal]);

  return ReactDOM.createPortal(children, element);
};

export default Modal;
