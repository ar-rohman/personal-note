import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDark } from './hooks/useDark';
import { useLocal } from './hooks/useLocal';
import { TokenContextProvider } from './contexts/TokenContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { LocalContextProvider } from './contexts/LocalContext';
import DetailPage from './pages/DetailPage';
import ActiveNotePage from './pages/ActiveNotePage';
import ArchivedNotePage from './pages/ArchivedNotePage';
import AddNote from './pages/AddNote';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AppHeader from './components/AppHeader';
import NotFound from './components/NotFound';

export default function App() {
    const [isLoggedin, setIsLoggedin] = useAuth();
    const [isDark, toggleTheme] = useDark();
    const [language, changeLanguage] = useLocal();

    const TokenContextValue = useMemo(() => {
        return { isLoggedin, setIsLoggedin };
    }, [isLoggedin]);

    const ThemeContextValue = useMemo(() => {
        return { isDark, toggleTheme };
    }, [isDark]);

    const LocalContextValue = useMemo(() => {
        return { language, changeLanguage };
    }, [language]);

    return (
        <div className="wrapper">
            <TokenContextProvider value={TokenContextValue}>
                <ThemeContextProvider value={ThemeContextValue}>
                    <LocalContextProvider value={LocalContextValue}>
                        <AppHeader />
                        <main>
                            {isLoggedin ? (
                                <Routes>
                                    <Route path="/" element={<ActiveNotePage />} />
                                    <Route path="/archived" element={<ArchivedNotePage />} />
                                    <Route path="/add" element={<AddNote />} />
                                    <Route path="/detail/:id" element={<DetailPage />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            ) : (
                                <Routes>
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route
                                        path="*"
                                        element={<Navigate to="/login" replace={true} />}
                                    />
                                </Routes>
                            )}
                        </main>
                    </LocalContextProvider>
                </ThemeContextProvider>
            </TokenContextProvider>
        </div>
    );
}
