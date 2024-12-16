import React from 'react';
import '../../../css/auth.css';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ status, canResetPassword }) {
        const { data, setData, post, processing, errors, reset } = useForm({
            email: '',
            password: '',
            password_confirmation: '',
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('register'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        };

    const togglePassword = (element, fieldId) => {
        const passwordField = document.getElementById(fieldId);
        if (passwordField?.type === 'password') {
            passwordField.type = 'text';
            element.classList.replace('fa-eye', 'fa-eye-slash');
        } else if (passwordField) {
            passwordField.type = 'password';
            element.classList.replace('fa-eye-slash', 'fa-eye');
        }
    };

    return (
        <div className="content">
            <Head title="Log in" />
            <div className="container">
                <div className="row">
                    <div className="login-form">
                        <div className="logo1">
                            <img id="logo" src="/images/intro.png" alt="Intro logo" />
                        </div>
                        <div className="form">
                            <h1 style={{ fontWeight: 'bold', color: '#F5511E', fontSize: '40px', marginBottom: '15px', textAlign: 'center' }}>
                                Register
                            </h1>
                            {status && <p className="status-message">{status}</p>}
                            {errors.name && <p style={{ color: 'red', marginLeft: '20px' }}>{errors.name}</p>}
                            {errors.password && <p style={{ color: 'red', marginLeft: '20px' }}>{errors.password}</p>}
                            <form onSubmit={submit}>
                            <div className="input-container">
                                    <input
                                        type="text"
                                        name="email"
                                        className="input-field"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <label>Email</label>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="input-field"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <label>Password</label>
                                    <i
                                        className="fa-solid fa-eye"
                                        onClick={(e) => togglePassword(e.target, 'password')}
                                    ></i>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        className="input-field"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <label>Confirm Password</label>
                                    <i
                                        className="fa-solid fa-eye"
                                        onClick={(e) => togglePassword(e.target, 'password_confirmation')}
                                    ></i>
                                </div>
                                <div className="forgot-password">
                                    {canResetPassword && (
                                        <Link id="forgot-password" href={route('password.request')}>
                                            Forgot Password?
                                        </Link>
                                    )}
                                </div>
                                <div className="login">
                                    <button type="submit" className="btn" disabled={processing}>
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="register">
                                <h3 id="register-btn">
                                    <Link href={route('login')} id="register-btn">
                                        Already have an account
                                    </Link>
                                </h3>
                            </div>
                            <div className="continue">
                                <p id="register-txt" style={{ color: '#F5511E', marginTop: '20px' }}>Or continue with</p>
                            </div>
                            <div className="linklogo">
                                <img src="/images/link/chrome.png" alt="Chrome"  />
                                <img src="/images/link/facebook.png" alt="Facebook"  />
                                <img src="/images/link/github.png" alt="GitHub"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
