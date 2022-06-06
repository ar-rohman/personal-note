import React from 'react';
import AppHeader from './AppHeader';
import NoteList from './NoteList';
import AddButton from './buttons/AddButton';
import NoteAdd from './NoteAdd';
import InitialData from '../utils/data';
import { currentLocaleDateJSON } from '../utils/date';

class PersonalNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: InitialData,
            filterNote: InitialData,
            keyword: '',
            showModal: false,
        };

        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onToggleArchiveHandler = this.onToggleArchiveHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onToggleModalHandler = this.onToggleModalHandler.bind(this);
    }

    onSearchHandler(event) {
        const keyword = event.target.value.toLowerCase();
        const search = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(keyword);
        });
        this.setState({ filterNote: search, keyword });
    }

    onDeleteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);
        const filterNote = this.state.filterNote.filter((note) => note.id !== id);
        this.setState({ notes, filterNote });
    }

    onToggleArchiveHandler(id) {
        const notes = this.state.notes.map((note) =>
            note.id === id ? { ...note, archived: !note.archived } : note
        );
        const filterNote = this.state.filterNote.map((note) =>
            note.id === id ? { ...note, archived: !note.archived } : note
        );

        this.setState({ notes, filterNote });
    }

    onToggleModalHandler() {
        this.setState({ showModal: !this.state.showModal });
    }

    onAddNoteHandler({ title, body, archived }) {
        const newNote = {
            id: Date.now(),
            title,
            body,
            archived,
            createdAt: currentLocaleDateJSON(),
        };

        this.setState((prevState) => {
            const notes = [...prevState.notes, newNote];
            const filterNote = [...prevState.filterNote, newNote];
            return { notes, filterNote };
        });
    }

    render() {
        const modal = this.state.showModal ? (
            <NoteAdd addNote={this.onAddNoteHandler} onShowModal={this.onToggleModalHandler} />
        ) : null;

        const list = this.state.keyword.length ? this.state.filterNote : this.state.notes;

        return (
            <div className="wrapper">
                <AppHeader onSearch={this.onSearchHandler} />
                <div className="container">
                    <AddButton onShowModal={this.onToggleModalHandler} />
                    {modal}
                    <NoteList
                        title="Active Notes"
                        notes={list.filter((note) => !note.archived)}
                        onDelete={this.onDeleteHandler}
                        onToggleArchive={this.onToggleArchiveHandler}
                    />
                    <NoteList
                        title="Archived Notes"
                        notes={list.filter((note) => note.archived)}
                        onDelete={this.onDeleteHandler}
                        onToggleArchive={this.onToggleArchiveHandler}
                    />
                </div>
            </div>
        );
    }
}

export default PersonalNote;
