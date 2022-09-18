import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBindReact from 'auto-bind/react';
import { searchNote, getActiveNotes, deleteNote, archiveNote } from '../utils/data';
import NoteItem from '../components/NoteItem';
import NoteSearch from '../components/NoteSearch';
import PrimaryButton from '../components/buttons/PrimaryButton';
import AddIcon from '../components/icons/AddIcon';
import ForwardIcon from '../components/icons/ForwardIcon';

export default function ActiveNotePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    const changeSearchParams = (keyword) => setSearchParams({ keyword });

    return <ActiveNotePage keyword={keyword} onSearch={changeSearchParams} />;
}

class ActiveNotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: props.keyword,
            notes: this.isSearched(),
        };

        autoBindReact(this);
    }

    isSearched() {
        if (this.props.keyword) {
            return searchNote({ keyword: this.props.keyword, isArchived: false });
        } else {
            return getActiveNotes();
        }
    }

    onSearchHandler(event) {
        const keyword = event.target.value.toLowerCase();
        const search = searchNote({ keyword, isArchived: false });
        this.setState({ notes: search, keyword });
        this.props.onSearch(keyword);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.setState({ notes: this.isSearched() });
    }

    onArchiveHandler(id) {
        archiveNote(id);
        this.setState({ notes: this.isSearched() });
    }

    render() {
        const notes = this.state.notes;
        return (
            <>
                <div className="top-nav-wrapper">
                    <NoteSearch onSearch={this.onSearchHandler} keyword={this.state.keyword} />
                    <Link to="/archived" className="top-nav-link">
                        <p>Archived Note</p>
                        <ForwardIcon />
                    </Link>
                </div>
                <div className="top-nav-wrapper">
                    <h2 className="list-title">Active Notes</h2>
                    <Link to="/add">
                        <PrimaryButton className="add-note-button">
                            <AddIcon />
                            <p>Add new note</p>
                        </PrimaryButton>
                    </Link>
                </div>
                <div className="list">
                    {notes?.length ? (
                        notes.map((note) => (
                            <NoteItem
                                key={note.id}
                                onDelete={this.onDeleteHandler}
                                onArchive={this.onArchiveHandler}
                                {...note}
                            />
                        ))
                    ) : (
                        <p>No notes</p>
                    )}
                </div>
            </>
        );
    }
}

ActiveNotePage.propTypes = {
    keyword: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
};
