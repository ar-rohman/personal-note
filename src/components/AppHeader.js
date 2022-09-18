import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
    const navigate = useNavigate();
    const goToHome = () => navigate('/');

    return (
        <header>
            <h1 className="header-text" onClick={goToHome}>
                Personal Note
            </h1>
        </header>
    );
}
