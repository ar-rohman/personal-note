import React from 'react';
import DeleteButton from './buttons/DeleteButton';
import ArchiveButton from './buttons/ArchiveButton';
import { formattedDate } from '../utils/date';

function NoteItem({ id, title, body, createdAt, archived, onDelete, onToggleArchive }) {
    return (
        <div className="list-item">
            <p className="list-item-title">{title}</p>
            <p className="list-item-date">{formattedDate(createdAt)}</p>
            <p>{body}</p>
            <div className="list-item-button">
                <DeleteButton id={id} onDelete={onDelete} />
                <ArchiveButton id={id} archived={archived} onToggleArchive={onToggleArchive} />
            </div>
        </div>
    );
}

export default NoteItem;
