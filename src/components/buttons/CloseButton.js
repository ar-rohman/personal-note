import React from 'react';
import CloseIcon from '../icons/CloseIcon';

function CloseButton({ onShowModal }) {
    return (
        <button className="button button-tertiary" onClick={() => onShowModal()}>
            <CloseIcon />
        </button>
    );
}

export default CloseButton;
