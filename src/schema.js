import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please provide firstName')
    .max(50, 'firstName must be less than 50 characters'),
  lastName: yup       
    .string()
    .required('Please provide lastName')
    .max(50, 'firstName must be less than 50 characters'),
  detail: yup
    .string()
    .required('Please provide detail')
    .oneOf(['COMPSCI', 'COLE', 'SCIENCE'], 'please provide valid detail'),
});

export default schema;
