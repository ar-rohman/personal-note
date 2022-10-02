import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import TokenContext from '../contexts/TokenContext';
import LocalContext from '../contexts/LocalContext';
import { login, putAccessToken } from '../utils/network-data';
import translate from '../utils/translate';
import PrimaryButton from '../components/buttons/PrimaryButton';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';
import EyeIcon from '../components/icons/EyeIcon';

export default function LoginPage() {
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { setIsLoggedin } = useContext(TokenContext);
    const { language } = useContext(LocalContext);

    const onSubmitEventHandler = async (event) => {
        event.preventDefault();
        const { error, data } = await login({ email, password });
        if (!error) {
            putAccessToken(data.accessToken);
            setIsLoggedin(true);
            navigate('/');
        }
    };

    const onShowPasswordHandler = () => setShowPassword((prevState) => !prevState);

    return (
        <>
            <h2 className="login-title">{translate[language].loginToYourAccount}</h2>
            <div className="card">
                <form className="form" onSubmit={onSubmitEventHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input-box"
                            value={email}
                            onChange={setEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-append">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="input-box"
                                value={password}
                                onChange={setPassword}
                            />
                            <div
                                className="input-append-icon"
                                onClick={onShowPasswordHandler}
                                role="button">
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </div>
                        </div>
                    </div>
                    <PrimaryButton type="submit">
                        <p>{translate[language].login}</p>
                    </PrimaryButton>
                </form>
            </div>
            <p className="auth-message">
                {translate[language].dontHaveAccount}
                <Link to="/register" className="auth-message-link">
                    {translate[language].registerHere}
                </Link>
            </p>
        </>
    );
}
