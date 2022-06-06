import React from 'react';
import RemoveIcon from '../icons/RemoveIcon';

function DeleteButton({ id, onDelete }) {
    return (
        <button className="button button-secondary" onClick={() => onDelete(id)}>
            <RemoveIcon />
            <p>Delete</p>
        </button>
    );
}

export default DeleteButton;
