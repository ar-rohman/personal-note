import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBindReact from 'auto-bind/react';
import { addNote } from '../utils/data';
import PrimaryButton from '../components/buttons/PrimaryButton';
import TertiaryButton from '../components/buttons/TertiaryButton';
import BackIcon from '../components/icons/BackIcon';
import SaveIcon from '../components/icons/SaveIcon';

export default function AddNoteWrapper() {
    const navigate = useNavigate();

    const saveNoteHandler = (data) => {
        addNote(data);
        navigate('/');
    };
    return <AddNote onSaveNote={saveNoteHandler} />;
}

class AddNote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            archived: false,
            character: 50,
            isBodyEmpty: false,
        };

        autoBindReact(this);
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
            body: event.target.innerHTML,
            isBodyEmpty: event.target.innerText ? false : true,
        }));
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        if (!this.state.body.length) {
            this.setState({ isBodyEmpty: true });
        } else {
            this.props.onSaveNote({
                title: this.state.title,
                body: this.state.body,
            });
        }
    }

    render() {
        return (
            <>
                <TertiaryButton className="-ml-4 mb-4" onClick={() => history.back()}>
                    <BackIcon />
                    <p>Back</p>
                </TertiaryButton>
                <h2 className="list-title mb-8">Add new note</h2>
                <form className="form" onSubmit={this.onSubmitEventHandler}>
                    <div className="form-group">
                        <label htmlFor="title">Note title</label>
                        <input
                            type="text"
                            id="title"
                            className="input-box"
                            value={this.state.title}
                            onChange={this.onTitleChangeEventHandler}
                        />
                        <span className="input-desc">
                            Remaining characters: {this.state.character}
                        </span>
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="content"
                            className={this.state.isBodyEmpty ? 'error-input' : ''}>
                            Write your note
                        </label>
                        <div
                            id="content"
                            className={`input-box input-box-body ${
                                this.state.isBodyEmpty ? 'error-border-box' : ''
                            }`}
                            contentEditable
                            onInput={this.onBodyChangeEventHandler}></div>
                        <div className="error-message">
                            {this.state.isBodyEmpty && `Note contents cannot be empty!`}
                        </div>
                    </div>
                    <div className="add-note">
                        <PrimaryButton type="submit" className="add-note-button">
                            <SaveIcon />
                            <p>Save note</p>
                        </PrimaryButton>
                    </div>
                </form>
            </>
        );
    }
}

AddNote.propTypes = {
    onSaveNote: PropTypes.func.isRequired,
};
