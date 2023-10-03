import React, { useRef, useEffect } from 'react';
import {
  Modal as BootstrapModal,
  Form,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

import getValidationSchema from './getValidationSchema.js';
import { selectors } from '../../slices/index.js';
import useApi from '../../hooks/useApi.js';

const RenameChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.getChannelsNames);
  const channelId = useSelector((state) => state.modal.extra?.channelId);
  const channel = useSelector((state) => selectors.channels.selectById(state, channelId));
  const inputRef = useRef(null);
  const api = useApi();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getValidationSchema(channels),
    onSubmit: async ({ name }) => {
      const filteredName = leoProfanity.clean(name);
      const data = { name: filteredName, id: channelId };
      try {
        await api.renameChannel(data);
        toast.success(t('channels.renamed'));
        handleClose();
      } catch (err) {
        inputRef.current.select();
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.rename')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={formik.isSubmitting}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={(formik.errors.name && formik.touched.name) || !!formik.status}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name) || t(formik.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

export default RenameChannelForm;
