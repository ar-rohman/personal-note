import React from 'react';
import SearchIcon from './icons/SearchIcon';

function NoteSearch({ onSearch }) {
    return (
        <div className="note-search">
            <span className="note-search-icon">
                <SearchIcon />
            </span>
            <input
                type="text"
                placeholder="Search note..."
                className="input-box note-search-input"
                onChange={onSearch}
            />
        </div>
    );
}

export default NoteSearch;
