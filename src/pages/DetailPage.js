import React from 'react';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/data';
import { formattedDate } from '../utils/date';
import NotFound from '../components/NotFound';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import TertiaryButton from '../components/buttons/TertiaryButton';
import BackIcon from '../components/icons/BackIcon';
import ArchiveAddIcon from '../components/icons/ArchiveAddIcon';
import ArchiveRemoveIcon from '../components/icons/ArchiveRemoveIcon';
import RemoveIcon from '../components/icons/RemoveIcon';

export default function isNoteExist() {
    const { id } = useParams();
    const note = getNote(id);

    return <>{note ? <DetailPage note={note} /> : <NotFound />}</>;
}

function DetailPage({ note }) {
    const onDeleteHandler = () => {
        deleteNote(note.id);
        history.back();
    };

    const onArchiveHandler = () => {
        archiveNote(note.id);
        history.back();
    };
    const onUnarchiveHandler = () => {
        unarchiveNote(note.id);
        history.back();
    };

    return (
        <>
            <TertiaryButton className="-ml-4 mb-4" onClick={() => history.back()}>
                <BackIcon />
                <p>Back</p>
            </TertiaryButton>
            <div className="detail-title">{note.title}</div>
            <p className="my-4">{formattedDate(note.createdAt)}</p>
            <p>{parser(note.body)}</p>
            <div className="detail-button">
                {note.archived ? (
                    <PrimaryButton onClick={() => onUnarchiveHandler()}>
                        <ArchiveRemoveIcon />
                        <p>Unarchive</p>
                    </PrimaryButton>
                ) : (
                    <PrimaryButton onClick={() => onArchiveHandler(note.id)}>
                        <ArchiveAddIcon />
                        <p>Archive</p>
                    </PrimaryButton>
                )}
                <SecondaryButton onClick={() => onDeleteHandler()}>
                    <RemoveIcon />
                    <p>Delete</p>
                </SecondaryButton>
            </div>
        </>
    );
}

DetailPage.propTypes = {
    note: PropTypes.object.isRequired,
};
