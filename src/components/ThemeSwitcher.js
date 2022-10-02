import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import TertiaryButton from './buttons/TertiaryButton';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

export default function ThemeSwitcher() {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    return (
        <TertiaryButton onClick={toggleTheme}>{isDark ? <SunIcon /> : <MoonIcon />}</TertiaryButton>
    );
}
