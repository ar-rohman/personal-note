import { useEffect, useState } from 'react';

export function useDark() {
    const isDarkTheme =
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const [isDark, setTheme] = useState(isDarkTheme);

    const toggleTheme = () => setTheme((prevState) => !prevState);

    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.theme = 'light';
        }
    }, [isDark]);

    return [isDark, toggleTheme];
}
