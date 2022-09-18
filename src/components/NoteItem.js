import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { formattedDate } from '../utils/date';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import RemoveIcon from './icons/RemoveIcon';
import ArchiveRemoveIcon from './icons/ArchiveRemoveIcon';
import ArchiveAddIcon from './icons/ArchiveAddIcon';

export default function NoteItem({
    id,
    title,
    body,
    createdAt,
    archived,
    onDelete,
    onArchive,
    onUnarchive,
}) {
    return (
        <section className="list-item">
            <Link to={`/detail/${id}`} className="list-item-title">
                {title}
            </Link>
            <p className="list-item-date">{formattedDate(createdAt)}</p>
            <p className="list-item-body">{parser(body)}</p>
            <div className="list-item-button">
                {archived ? (
                    <PrimaryButton onClick={() => onUnarchive(id)}>
                        <ArchiveRemoveIcon />
                        <p>Unarchive</p>
                    </PrimaryButton>
                ) : (
                    <PrimaryButton onClick={() => onArchive(id)}>
                        <ArchiveAddIcon />
                        <p>Archive</p>
                    </PrimaryButton>
                )}
                <SecondaryButton onClick={() => onDelete(id)}>
                    <RemoveIcon />
                    <p>Delete</p>
                </SecondaryButton>
            </div>
        </section>
    );
}

NoteItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func,
    onUnarchive: PropTypes.func,
};
