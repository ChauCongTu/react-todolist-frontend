import React, { useState } from 'react'
import { loginService } from './services/login-services';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../../providers/AuthProvider';
import { Button, Form, Input } from 'antd';
import './login.scss';

const Login: React.FC = (props: any) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const loginProp = { email: email, password: password, token: null, login: null };
        loginService(loginProp)
            .then((data) => {
                localStorage.setItem('login_info', JSON.stringify(data.login));
                localStorage.setItem('token', JSON.stringify(data.token));
                login();
            })
            .catch((error) => {
                toast.error("Invalid Login!");
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
                        <Input placeholder='Enter email or username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <div className='text-center'>
                        <Button className='text-end' onClick={() => handleLogin()}>Register</Button>
                    </div>
                    <Toaster />
                </Form>
            </div>
        </div>
    )
}

export default Login