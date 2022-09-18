import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ActiveNotePage from './pages/ActiveNotePage';
import ArchivedNotePage from './pages/ArchivedNotePage';
import AddNote from './pages/AddNote';
import NotFound from './components/NotFound';
import AppHeader from './components/AppHeader';

export default function App() {
    return (
        <div className="wrapper">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<ActiveNotePage />} />
                    <Route path="/archived" element={<ArchivedNotePage />} />
                    <Route path="/add" element={<AddNote />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}
