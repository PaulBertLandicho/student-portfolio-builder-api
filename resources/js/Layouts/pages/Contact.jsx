import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import '../../../css/portfolio.css'; // Ensure you have the correct styles for your components

export default function Contact() {
    const user = usePage().props.auth.user;
    
    return (
        <div className="content" style={{ height: '250px', marginTop: '20px' }}>
            <div className="text" style={{ textAlign: 'center' }}>
                <h2>Contact Me</h2>
            </div>

            <div className="section">
                <p className="contact">
                    <i className="fa-solid fa-user"></i>
                    <span className="profession-text">{user.name}</span>
                </p>
                <p className="contact">
                    <i className="fa-solid fa-location-dot" ></i>
                    <span className="profession-text">{user.address}</span>
                </p>
                <p className="contact">
                    <i className="fa-solid fa-envelope" ></i>
                    <span className="profession-text">{user.email}</span>
                </p>
                <p className="contact">
                    <i className="fa-solid fa-phone" ></i>
                    <span className="profession-text">{user.contact}</span>
                </p>

                
            </div>
        </div>
    );
}
