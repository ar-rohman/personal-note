import React from 'react';
import ArchiveAddIcon from '../icons/ArchiveAddIcon';
import ArchiveRemoveIcon from '../icons/ArchiveRemoveIcon';

function ArchiveButton({ id, archived, onToggleArchive }) {
    let buttonContent;
    if (archived) {
        buttonContent = (
            <>
                <ArchiveRemoveIcon />
                <p>Unarchive</p>
            </>
        );
    } else {
        buttonContent = (
            <>
                <ArchiveAddIcon />
                <p>Archive</p>
            </>
        );
    }
    return (
        <button className="button button-primary" onClick={() => onToggleArchive(id)}>
            {buttonContent}
        </button>
    );
}

export default ArchiveButton;
