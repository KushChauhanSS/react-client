import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().min(3),
  sport: yup.string().min(1),
  cricket: yup.string().min(1),
  football: yup.string().min(1),
});
