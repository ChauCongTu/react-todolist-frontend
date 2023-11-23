import { Container } from '@mui/material'
import { Button, DatePicker, Form, Input, Select, Space, Upload } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { RegisterProps } from './types/type';
import { registerService } from './services/registerService';
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
  const [formData, setFormData] = useState<RegisterProps>({
    username: '',
    password: '',
    email: '',
    full_name: '',
    date_of_birth: '',
    gender: '',
    phone_number: '',
    token: null,
    login: null
  });
  const handleInputChange = (fieldName: keyof RegisterProps, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleSubmit = () => {
    registerService(formData)
      .then((data) => {
        localStorage.setItem('login_info', JSON.stringify(data.login));
        localStorage.setItem('token', JSON.stringify(data.token));
        toast.success('Đăng kí thành công!');
      })
      .catch((error) => {
        toast.error('Lỗi validate ' + error.response.status);
      });
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='container-fluid'>
        <Form
          labelCol={{ span: 2 }}
          layout="horizontal"
        >
          <Form.Item label="Username">
            <Input placeholder='Enter username'
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)} />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input placeholder='Enter full name'
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)} />
          </Form.Item>
          <Form.Item label="Email Address">
            <Input placeholder='Enter email address'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input type={'number'} placeholder='Enter phone number'
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)} />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)} />
          </Form.Item>
          <Form.Item label="Birthday">
            <input type={'date'} className="form-control"
              value={formData.date_of_birth}
              onChange={(e) => handleInputChange('date_of_birth', e.target.value)} />
          </Form.Item>
          <Form.Item label="Gender">
            <Select placeholder='Select gender' onChange={(value) => handleInputChange('gender', value)}>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <div className='text-center'>
            <Button className='text-end' onClick={() => handleSubmit()}>Register</Button>
          </div>
          <Toaster />
        </Form>
      </div>
    </div>
  )
}

export default Register