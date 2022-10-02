import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocalContext from '../contexts/LocalContext';
import translate from '../utils/translate';
import SearchIcon from './icons/SearchIcon';

export default function NoteSearch({ onSearch, keyword }) {
    const { language } = useContext(LocalContext);

    return (
        <div className="note-search">
            <span className="note-search-icon">
                <SearchIcon />
            </span>
            <input
                type="text"
                placeholder={translate[language].searchNote}
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
