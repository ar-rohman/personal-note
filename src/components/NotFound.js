import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalContext from '../contexts/LocalContext';
import translate from '../utils/translate';
import PrimaryButton from './buttons/PrimaryButton';
import BackIcon from './icons/BackIcon';

export default function NotFound() {
    const navigate = useNavigate();
    const goToHome = () => navigate('/');
    const { language } = useContext(LocalContext);

    return (
        <section className="not-found">
            <h2>404 {translate[language].notFound}</h2>
            <PrimaryButton onClick={goToHome}>
                <BackIcon />
                <p>{translate[language].backToHome}</p>
            </PrimaryButton>
        </section>
    );
}
