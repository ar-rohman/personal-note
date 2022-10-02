import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import LocalContext from '../contexts/LocalContext';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import translate from '../utils/translate';
import NoteItem from '../components/NoteItem';
import NoteSearch from '../components/NoteSearch';
import ForwardIcon from '../components/icons/ForwardIcon';
import CardSkeleton from '../components/skeleton/CardSkeleton';

export default function ArchivedNotePage() {
    const [keyword, onSearch] = useSearch();
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [fetch, setFetch] = useState(1);
    const { language } = useContext(LocalContext);

    const onDeleteHandler = async (id) => {
        await deleteNote(id);
        setFetch((prevSate) => prevSate + 1);
    };

    const onUnarchiveHandler = async (id) => {
        await unarchiveNote(id);
        setFetch((prevSate) => prevSate + 1);
    };

    useEffect(() => {
        const getNotes = async () => {
            const { error, data } = await getArchivedNotes();
            setLoading(error);
            setArchivedNotes(data);
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
            const filtered = archivedNotes?.filter(({ title }) =>
                title.toLowerCase().includes(keyword)
            );
            setNotes(filtered);
        } else {
            setNotes(archivedNotes);
        }
    }, [keyword]);

    return (
        <>
            <div className="top-nav-wrapper">
                <NoteSearch onSearch={onSearch} keyword={keyword} />
                <Link to="/" className="top-nav-link">
                    <p>{translate[language].activeNotes}</p>
                    <ForwardIcon />
                </Link>
            </div>
            <h2 className="list-title  mb-8">{translate[language].archivedNotes}</h2>
            <div className="list">
                {isLoading ? (
                    <CardSkeleton />
                ) : notes?.length ? (
                    notes.map((note) => (
                        <NoteItem
                            key={note.id}
                            onDelete={onDeleteHandler}
                            onUnarchive={onUnarchiveHandler}
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
