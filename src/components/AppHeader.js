import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext';
import LogoutDropdown from './LogoutDropdown';
import ThemeSwitcher from './ThemeSwitcher';
import DualLanguage from './DualLanguage';

export default function AppHeader() {
    const navigate = useNavigate();
    const goToHome = () => navigate('/');

    const { isLoggedin } = useContext(TokenContext);

    return (
        <header>
            <h1 className="header-text" onClick={goToHome}>
                Personal Note
            </h1>
            <div className="header-button">
                <DualLanguage />
                <ThemeSwitcher />
                {isLoggedin && <LogoutDropdown />}
            </div>
        </header>
    );
}
