import * as yup from 'yup';

const getValidationSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('modals.required')
    .min(3, 'modals.min')
    .max(20, 'modals.max')
    .notOneOf(channels, 'modals.uniq'),
});

export default getValidationSchema;
