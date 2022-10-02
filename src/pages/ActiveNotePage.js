import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import LocalContext from '../contexts/LocalContext';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import translate from '../utils/translate';
import NoteItem from '../components/NoteItem';
import NoteSearch from '../components/NoteSearch';
import PrimaryButton from '../components/buttons/PrimaryButton';
import AddIcon from '../components/icons/AddIcon';
import ForwardIcon from '../components/icons/ForwardIcon';
import CardSkeleton from '../components/skeleton/CardSkeleton';

export default function ActiveNotePage() {
    const [keyword, onSearch] = useSearch();
    const [activeNotes, setActiveNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [fetch, setFetch] = useState(1);
    const { language } = useContext(LocalContext);

    const onDeleteHandler = async (id) => {
        await deleteNote(id);
        setFetch((prevSate) => prevSate + 1);
    };

    const onArchiveHandler = async (id) => {
        await archiveNote(id);
        setFetch((prevSate) => prevSate + 1);
    };

    useEffect(() => {
        const getNotes = async () => {
            const { error, data } = await getActiveNotes();
            setLoading(error);
            setActiveNotes(data);
            if (keyword) {
                const filtered = data?.filter(({ title }) => title.toLowerCase().includes(keyword));
                setNotes(filtered);
            } else {
                setNotes(data);
            }
        };

        getNotes();
    }, [fetch]);

    useEffect(() => {
        if (keyword) {
            const filtered = activeNotes?.filter(({ title }) =>
                title.toLowerCase().includes(keyword)
            );
            setNotes(filtered);
        } else {
            setNotes(activeNotes);
        }
    }, [keyword]);

    return (
        <>
            <div className="top-nav-wrapper">
                <NoteSearch onSearch={onSearch} keyword={keyword} />
                <Link to="/archived" className="top-nav-link">
                    <p>{translate[language].archivedNotes}</p>
                    <ForwardIcon />
                </Link>
            </div>
            <div className="top-nav-wrapper">
                <h2 className="list-title">{translate[language].activeNotes}</h2>
                <Link to="/add">
                    <PrimaryButton className="add-note-button">
                        <AddIcon />
                        <p>{translate[language].addNewNote}</p>
                    </PrimaryButton>
                </Link>
            </div>
            <div className="list">
                {isLoading ? (
                    <CardSkeleton />
                ) : notes?.length ? (
                    notes.map((note) => (
                        <NoteItem
                            key={note.id}
                            onDelete={onDeleteHandler}
                            onArchive={onArchiveHandler}
                            {...note}
                        />
                    ))
                ) : (
                    <p>{translate[language].noNotes}</p>
                )}
            </div>
        </>
    );
}
