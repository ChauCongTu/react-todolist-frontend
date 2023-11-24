import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useAuth } from '../../../providers/AuthProvider';
import loginValidation from './validations/login';
import { loginService } from './services/login-services';
import toast, { Toaster } from 'react-hot-toast';



const Login: React.FC = () => {
    useEffect(() => {
        document.title = 'Login to NTodo List';
    }, []);
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleLogin = () => {
        try {
            const values = loginValidation.parse({ email, password });
            setValidationErrors({}); // Clear previous validation errors
            const loginProp = { email: values.email, password: values.password, token: null, login: null };
            loginService(loginProp)
                .then((data) => {
                    localStorage.setItem('login_info', JSON.stringify(data.login));
                    localStorage.setItem('token', JSON.stringify(data.token));
                    login();
                })
                .catch((error) => {
                    toast.error("Invalid Login! Check your Password or Email");
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
            <label>Email: </label>
            <Form.Item help={validationErrors.email} validateStatus={validationErrors.email ? 'error' : ''}>
                <Input
                    placeholder='Enter email or username'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item help={validationErrors.password} validateStatus={validationErrors.password ? 'error' : ''}>
                <label>Password: </label>
                <Input.Password
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>
            <div className='text-center'>
                <Button className='text-end' onClick={handleLogin}>Login</Button>
            </div>
            <Toaster />
        </Form>
    );
};

export default Login;
