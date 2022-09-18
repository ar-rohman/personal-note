import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './buttons/PrimaryButton';
import BackIcon from './icons/BackIcon';

export default function NotFoundPage() {
    const navigate = useNavigate();
    const goToHome = () => navigate('/');

    return (
        <section className="not-found">
            <h2>404 Not found</h2>
            <PrimaryButton onClick={goToHome}>
                <BackIcon />
                <p>Back to home</p>
            </PrimaryButton>
        </section>
    );
}
