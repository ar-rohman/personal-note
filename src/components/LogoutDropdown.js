import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../hooks/useClickOutside';
import TokenContext from '../contexts/TokenContext';
import LocalContext from '../contexts/LocalContext';
import { getUserLogged } from '../utils/network-data';
import translate from '../utils/translate';
import PrimaryButton from './buttons/PrimaryButton';
import TertiaryButton from './buttons/TertiaryButton';
import UserIcon from './icons/UserIcon';
import LogoutIcon from './icons/LogoutIcon';

export default function LogoutDropdown() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState();
    const { isLoggedin, setIsLoggedin } = useContext(TokenContext);
    const { language } = useContext(LocalContext);

    const element = useRef();

    const onShowDropdown = () => setShowDropdown((prevState) => !prevState);
    useClickOutside(element, () => setShowDropdown(false));
    const onLogoutHandler = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedin(false);
        navigate('/login');
    };

    useEffect(() => {
        const getUserData = async () => {
            if (isLoggedin) {
                const { data } = await getUserLogged();
                setUserData(data);
            }
        };

        getUserData();
    }, [isLoggedin]);
    return (
        <div ref={element} className="dropdown-wrapper">
            <TertiaryButton onClick={onShowDropdown}>
                <UserIcon />
            </TertiaryButton>
            {showDropdown && (
                <div className="dropdown">
                    <p className="dropdown-name">{userData?.name}</p>
                    <p className="dropdown-email">{userData?.email}</p>
                    <PrimaryButton onClick={onLogoutHandler}>
                        <p>{translate[language].logout}</p>
                        <LogoutIcon />
                    </PrimaryButton>
                </div>
            )}
        </div>
    );
}
