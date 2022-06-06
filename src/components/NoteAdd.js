import React from 'react';
import CloseButton from './buttons/CloseButton';
import SaveIcon from './icons/SaveIcon';

class NoteAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            archived: false,
            character: 50,
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onArchivedChangeEventHandler = this.onArchivedChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        if (event.target.value.length <= 50) {
            this.setState((prevState) => ({
                ...prevState,
                title: event.target.value,
                character: 50 - event.target.value.length,
            }));
        }
    }

    onBodyChangeEventHandler(event) {
        this.setState((prevState) => ({
            ...prevState,
            body: event.target.value,
        }));
    }

    onArchivedChangeEventHandler(event) {
        this.setState((prevState) => ({
            ...prevState,
            archived: event.target.value,
        }));
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
        this.props.onShowModal();
    }

    render() {
        return (
            <div id="modal" className="modal-overlay">
                <div className="modal-container">
                    <div className="modal">
                        <div className="card">
                            <div className="modal-close">
                                <CloseButton onShowModal={this.props.onShowModal} />
                            </div>
                            <h2 className="card-header">Add new note</h2>
                            <form className="form" onSubmit={this.onSubmitEventHandler}>
                                <div className="form-group">
                                    <label htmlFor="title">Note title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="input-box"
                                        value={this.state.title}
                                        onChange={this.onTitleChangeEventHandler}
                                        required
                                    />
                                    <span className="input-desc">
                                        Remaining characters: {this.state.character}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content">Write your note</label>
                                    <textarea
                                        id="content"
                                        className="input-box"
                                        rows="6"
                                        value={this.state.body}
                                        onChange={this.onBodyChangeEventHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group-row">
                                    <input
                                        type="checkbox"
                                        id="archived"
                                        className="checkbox"
                                        checked={this.state.archived}
                                        onChange={this.onArchivedChangeEventHandler}
                                    />
                                    <label htmlFor="archived">Archived</label>
                                </div>
                                <button type="submit" className="button button-primary">
                                    <SaveIcon />
                                    <p>Save note</p>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteAdd;
