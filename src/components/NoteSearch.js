import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from './icons/SearchIcon';

export default function NoteSearch({ onSearch, keyword }) {
    return (
        <div className="note-search">
            <span className="note-search-icon">
                <SearchIcon />
            </span>
            <input
                type="text"
                placeholder="Search note..."
                className="input-box note-search-input"
                value={keyword ?? ''}
                onChange={onSearch}
            />
        </div>
    );
}

NoteSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    keyword: PropTypes.string,
};
