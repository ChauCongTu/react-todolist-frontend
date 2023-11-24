import { Button, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import registerValidate from './validations/register';
import { registerService } from './services/registerService';
import { RegisterProps } from './types/type';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const Register: React.FC = () => {
  useEffect(() => {
    document.title = 'Register new Account';
  }, []);
  const [formData, setFormData] = useState<RegisterProps>({
    username: '',
    password: '',
    email: '',
    full_name: '',
    date_of_birth: '',
    gender: '',
    phone_number: '',
    token: null,
    login: null,
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (fieldName: keyof RegisterProps, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString);
    setFormData((prevData) => ({
      ...prevData,
      date_of_birth: dateString,
    }));
  };


  const handleSubmit = () => {
    try {
      const values = registerValidate().parse(formData);
      setValidationErrors({}); // Clear previous validation errors

      registerService(values)
        .then((data) => {
          localStorage.setItem('login_info', JSON.stringify(data.login));
          localStorage.setItem('token', JSON.stringify(data.token));
          console.log(data)
        })
        .catch((error) => {
          setValidationErrors((data) => ({
            ...data,
            registerError: 'Registration failed, maybe email or username already exists, please try again.'
          }));
        });
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((e: any) => {
          errors[e.path[0]] = e.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <Form>
      <Form.Item
        help={validationErrors.full_name}
        validateStatus={validationErrors.full_name ? 'error' : ''}
        style={{ marginBottom: 12 }}
      >
        <label>Full Name</label>
        <Input
          placeholder='Enter full name'
          value={formData.full_name}
          onChange={(e) => handleInputChange('full_name', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        help={validationErrors.email}
        validateStatus={validationErrors.email ? 'error' : ''}
        style={{ marginBottom: 12 }}
      >
        <label>Email</label>
        <Input
          name='email'
          placeholder='Enter email address'
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        help={validationErrors.phone_number}
        validateStatus={validationErrors.phone_number ? 'error' : ''}
        style={{ marginBottom: 12 }}
      >
        <label>Phone Number</label>
        <Input
          name='phone_number'
          placeholder='Enter phone number'
          value={formData.phone_number}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
        />
      </Form.Item>
      <div className='d-flex'>
        <Form.Item
          help={validationErrors.username}
          validateStatus={validationErrors.username ? 'error' : ''}
          style={{ marginBottom: 12, marginRight: 5 }}
        >
          <label>Username</label>
          <Input
            placeholder='Enter username'
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          help={validationErrors.password}
          validateStatus={validationErrors.password ? 'error' : ''}
          style={{ marginBottom: 12, marginRight: 5 }}
        >
          <label>Password</label>
          <Input.Password
            placeholder='Enter password'
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </Form.Item>
      </div>


      <Form.Item
        help={validationErrors.date_of_birth}
        validateStatus={validationErrors.date_of_birth ? 'error' : ''}
        style={{ marginBottom: 12 }}
      >
        <div>
          <label>Date of Birth</label>
        </div>
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item
        help={validationErrors.gender}
        validateStatus={validationErrors.gender ? 'error' : ''}
        style={{ marginBottom: 12 }}
      >
        <label>Gender</label>
        <Select
          placeholder='Select gender'
          onChange={(value) => handleInputChange('gender', value)}
        >
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>

      <div className='text-center'>
        <Button className='text-end' onClick={() => handleSubmit()}>Register</Button>
      </div>
      <div className='text-danger my-3'>{validationErrors.registerError ? validationErrors.registerError : ''}</div>
      <Toaster />
    </Form>
  );
};

export default Register;
