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
  genre: yup
    .string()
    .required('Please provide genre')
    .oneOf(['JAZZ', 'ROCK', 'BLUES'], 'please provide valid genre'),
});

export default schema;
