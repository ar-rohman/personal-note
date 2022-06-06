import React from 'react';
import AddIcon from '../icons/AddIcon';

function AddButton({ onShowModal }) {
    return (
        <div className="add-note">
            <button className="button button-primary add-note-button" onClick={() => onShowModal()}>
                <AddIcon />
                <p>Add new note</p>
            </button>
        </div>
    );
}

export default AddButton;
