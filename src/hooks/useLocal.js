import { useEffect, useState } from 'react';

export function useLocal() {
    const local = localStorage.local || 'en-US';
    const [language, setLanguage] = useState(local);

    const changeLanguage = () => {
        setLanguage((prevState) => (prevState === 'en-US' ? 'id-ID' : 'en-US'));
    };

    useEffect(() => {
        localStorage.local = language;
    }, [language]);

    return [language, changeLanguage];
}
