import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().min(3),
  sport: yup.string().min(1),
  cricket: yup.string().min(1),
  football: yup.string().min(1),
});

export const traineeFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(20)
    .label('Name')
    .required(),
  email: yup
    .string()
    .email()
    .label('Email Address')
    .required(),
  password: yup
    .string()
    .label('Password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must contain 8 characters, atleast one uppercase, one lowercase and one number',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .label('Confirm Password')
    .oneOf([yup.ref('password'), null], 'Must match password')
    .required('Confirm Password is required'),
});

export const loginFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .label('Email Address')
    .required(),
  password: yup
    .string()
    .label('Password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must contain 8 characters, atleast one uppercase, one lowercase and one number',
    )
    .required('Password is required'),
});
