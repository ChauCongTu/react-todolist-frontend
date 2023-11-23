import * as yup from 'yup';

const loginValidation = yup.object({
  name: yup.string().required('Tên không được để trống'),
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
});

export default loginValidation;