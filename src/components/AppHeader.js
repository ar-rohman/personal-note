import React from 'react';
import NoteSearch from './NoteSearch';

function AppHeader({ onSearch }) {
    return (
        <header>
            <h1 className="header-text">Personal Notes</h1>
            <NoteSearch onSearch={onSearch} />
        </header>
    );
}

export default AppHeader;
