import React, { useState } from 'react'
import Login from '../modules/auth/login/login'
import Register from '../modules/auth/register/register'
import './assets/auth.scss'

const Auth: React.FC = () => {
    const [form, setForm] = useState(1);

    const switchForm = () => {
        setForm(form === 1 ? 2 : 1); 
    }

    return (
        <div id="main-wrapper" className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme" onClick={() => switchForm}>NTodo List</h3>
                                        </div>

                                        {form === 1 ? <>
                                            <h6 className="h5 mb-0">Welcome back!</h6>
                                            <p className="text-muted mt-2">Enter your email address and password to access your todo list.</p>
                                            <Login />
                                            <p className="text-muted text-center mt-3 mb-0">Don't have an account? <a className="switch-link" onClick={() => switchForm()}>Register</a></p>
                                        </> : <>
                                            <Register />
                                            <p className="text-muted text-center mt-3 mb-0">You have an account? <a className="switch-link" onClick={() => switchForm()}>Back to Login</a></p>
                                        </>}
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        <div className="account-testimonial">
                                            <h4 className="text-white mb-4">What is Todolist?</h4>
                                            <p className="lead text-white">"To complete work quickly and effectively, you need to create a To Do List of specific tasks."</p>
                                            <p>- Admin User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth