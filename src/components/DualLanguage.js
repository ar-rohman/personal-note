import React, { useContext } from 'react';
import LocalContext from '../contexts/LocalContext';
import TertiaryButton from './buttons/TertiaryButton';
import TranslateIcon from './icons/TranslateIcon';

export default function DualLanguage() {
    const { language, changeLanguage } = useContext(LocalContext);

    return (
        <TertiaryButton onClick={changeLanguage}>
            <TranslateIcon />
            <p className="languange-code">{language === 'en-US' ? 'id' : 'en'}</p>
        </TertiaryButton>
    );
}
