import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ title, notes, onDelete, onToggleArchive }) {
    let noteList;

    if (notes.length) {
        noteList = notes.map((note) => (
            <NoteItem
                key={note.id}
                onDelete={onDelete}
                onToggleArchive={onToggleArchive}
                {...note}
            />
        ));
    } else {
        noteList = <p>No notes</p>;
    }

    return (
        <>
            <h2 className="list-title">{title}</h2>
            <div className="list">{noteList}</div>
        </>
    );
}

export default NoteList;
