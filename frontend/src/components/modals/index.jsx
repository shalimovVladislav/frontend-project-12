import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import AddChannelForm from './AddChannelForm.jsx';
import RemoveChannelForm from './RemoveChannelForm.jsx';
import RenameChannelForm from './RenameChannelForm.jsx';
import { actions } from '../../slices/index.js';

const mapping = {
  addChannel: AddChannelForm,
  removeChannel: RemoveChannelForm,
  renameChannel: RenameChannelForm,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modal.isOpened);

  const handleClose = () => {
    dispatch(actions.closeModal());
  };
  const modalType = useSelector((state) => state.modal.type);

  const Component = mapping[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose} centered>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
