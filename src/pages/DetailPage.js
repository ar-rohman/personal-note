import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { formattedDate } from '../utils/date';
import translate from '../utils/translate';
import LocalContext from '../contexts/LocalContext';
import NotFound from '../components/NotFound';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import TertiaryButton from '../components/buttons/TertiaryButton';
import BackIcon from '../components/icons/BackIcon';
import ArchiveAddIcon from '../components/icons/ArchiveAddIcon';
import ArchiveRemoveIcon from '../components/icons/ArchiveRemoveIcon';
import RemoveIcon from '../components/icons/RemoveIcon';
import DetailSkeleton from '../components/skeleton/DetailSkeleton';

export default function DetailPage() {
    const { id } = useParams();
    const [note, setNote] = useState();
    const [isLoading, setLoading] = useState(true);
    const { language } = useContext(LocalContext);

    const onDeleteHandler = async () => {
        const { error } = await deleteNote(note.id);
        if (!error) history.back();
    };

    const onArchiveHandler = async () => {
        const { error } = await archiveNote(note.id);
        if (!error) history.back();
    };
    const onUnarchiveHandler = async () => {
        const { error } = await unarchiveNote(note.id);
        if (!error) history.back();
    };

    useEffect(() => {
        const getNoteById = async () => {
            const { data, error } = await getNote(id);
            if (!error) {
                setNote(data);
            }
            setLoading(false);
        };

        getNoteById();
    }, []);

    return (
        <>
            {isLoading ? (
                <DetailSkeleton />
            ) : note ? (
                <>
                    <TertiaryButton className="-ml-4 mb-4" onClick={() => history.back()}>
                        <BackIcon />
                        <p>{translate[language].back}</p>
                    </TertiaryButton>
                    <div className="detail-title">{note.title}</div>
                    <p className="my-4">{formattedDate(note.createdAt, language)}</p>
                    <p>{parser(note.body)}</p>
                    <div className="detail-button">
                        {note.archived ? (
                            <PrimaryButton onClick={() => onUnarchiveHandler()}>
                                <ArchiveRemoveIcon />
                                <p>{translate[language].unarchive}</p>
                            </PrimaryButton>
                        ) : (
                            <PrimaryButton onClick={() => onArchiveHandler(note.id)}>
                                <ArchiveAddIcon />
                                <p>{translate[language].archive}</p>
                            </PrimaryButton>
                        )}
                        <SecondaryButton onClick={() => onDeleteHandler()}>
                            <RemoveIcon />
                            <p>{translate[language].delete}</p>
                        </SecondaryButton>
                    </div>
                </>
            ) : (
                <NotFound />
            )}
        </>
    );
}
