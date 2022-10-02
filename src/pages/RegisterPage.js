import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import LocalContext from '../contexts/LocalContext';
import { register } from '../utils/network-data';
import translate from '../utils/translate';
import PrimaryButton from '../components/buttons/PrimaryButton';
import EyeSlashIcon from '../components/icons/EyeSlashIcon';
import EyeIcon from '../components/icons/EyeIcon';

export default function RegisterPage() {
    const [name, setName] = useInput('');
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { language } = useContext(LocalContext);

    const onSubmitEventHandler = async (event) => {
        event.preventDefault();
        const { error } = await register({ name, email, password });
        if (!error) navigate('/login');
    };

    const onShowPasswordHandler = () => setShowPassword((prevState) => !prevState);

    return (
        <>
            <h2 className="login-title">{translate[language].createAccount}</h2>
            <div className="card">
                <form className="form" onSubmit={onSubmitEventHandler}>
                    <div className="form-group">
                        <label htmlFor="name">{translate[language].name}</label>
                        <input
                            type="text"
                            id="name"
                            className="input-box"
                            value={name}
                            onChange={setName}
                        />
                    </div>
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
                        <p>{translate[language].register}</p>
                    </PrimaryButton>
                </form>
            </div>
            <p className="auth-message">
                {translate[language].haveAccount}
                <Link to="/login" className="auth-message-link">
                    {translate[language].loginHere}
                </Link>
            </p>
        </>
    );
}
