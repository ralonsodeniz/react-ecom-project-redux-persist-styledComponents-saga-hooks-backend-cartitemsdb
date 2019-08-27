import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { closeModal } from "../../redux/account/account.actions";
import { selectModalText } from "../../redux/account/account.selectors";

import OnClickOutside from "../onclick-outside/onclick-outside.component";

import {
  InnerModalContainer,
  InnerModalMessage,
  InnerModalButton,
  InnerModalText
} from "./inner-modal.styles";

const InnerModal = ({ closeModal, modalText }) => (
  <InnerModalContainer>
    <OnClickOutside action={closeModal} enabled={true}>
      <InnerModalMessage>
        <InnerModalText>{modalText}</InnerModalText>
        <InnerModalButton onClick={closeModal}>close</InnerModalButton>
      </InnerModalMessage>
    </OnClickOutside>
  </InnerModalContainer>
);

const mapStateToProps = createStructuredSelector({
  modalText: selectModalText
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerModal);
