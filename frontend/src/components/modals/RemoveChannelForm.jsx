import React, { useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useApi from '../../hooks/useApi.js';

const RemoveChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const channelId = useSelector((state) => state.modal.extra?.channelId);

  const handleRemove = async () => {
    setLoading(true);
    try {
      await api.removeChannel({ id: channelId });
      toast.success(t('channels.removed'));
      handleClose();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.remove')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};

export default RemoveChannelForm;
