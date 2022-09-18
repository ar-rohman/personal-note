import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBindReact from 'auto-bind/react';
import { searchNote, getArchivedNotes, deleteNote, unarchiveNote } from '../utils/data';
import NoteItem from '../components/NoteItem';
import NoteSearch from '../components/NoteSearch';
import ForwardIcon from '../components/icons/ForwardIcon';

export default function ArchivedNotePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    const changeSearchParams = (keyword) => setSearchParams({ keyword });

    return <ArchivedNotePage keyword={keyword} onSearch={changeSearchParams} />;
}

class ArchivedNotePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: this.isSearched(),
            keyword: props.keyword,
        };

        autoBindReact(this);
    }

    isSearched() {
        if (this.props.keyword) {
            return searchNote({ keyword: this.props.keyword, isArchived: true });
        } else {
            return getArchivedNotes();
        }
    }

    onSearchHandler(event) {
        const keyword = event.target.value.toLowerCase();
        const search = searchNote({ keyword, isArchived: true });
        this.setState({ notes: search, keyword });
        this.props.onSearch(keyword);
    }

    onDeleteHandler(id) {
        deleteNote(id);
        this.setState({ notes: this.isSearched() });
    }

    onUnarchiveHandler(id) {
        unarchiveNote(id);
        this.setState({ notes: this.isSearched() });
    }

    render() {
        const notes = this.state.notes;
        return (
            <>
                <div className="top-nav-wrapper">
                    <NoteSearch onSearch={this.onSearchHandler} keyword={this.state.keyword} />
                    <Link to="/" className="top-nav-link">
                        Active Note <ForwardIcon />
                    </Link>
                </div>
                <h2 className="list-title mb-8">Archived Notes</h2>
                <div className="list">
                    {notes?.length ? (
                        notes.map((note) => (
                            <NoteItem
                                key={note.id}
                                onDelete={this.onDeleteHandler}
                                onUnarchive={this.onUnarchiveHandler}
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

ArchivedNotePage.propTypes = {
    keyword: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
};
