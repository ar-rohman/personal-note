import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import LocalContext from '../contexts/LocalContext';
import { addNote } from '../utils/network-data';
import translate from '../utils/translate';
import PrimaryButton from '../components/buttons/PrimaryButton';
import TertiaryButton from '../components/buttons/TertiaryButton';
import BackIcon from '../components/icons/BackIcon';
import SaveIcon from '../components/icons/SaveIcon';

export default function AddNote() {
    const navigate = useNavigate();
    const [isBodyEmpty, setBodyEmpty] = useState(false);
    const [title, setTitle] = useInput();
    const [body, setBody] = useState('');
    const [character, setCharacter] = useState(50);
    const { language } = useContext(LocalContext);

    const onTitleChangeHandler = (event) => {
        if (event.target.value.length <= 50) {
            setTitle(event);
            setCharacter(50 - event.target.value.length);
        }
    };

    const onBodyChangeHandler = (event) => {
        setBody(event.target.innerHTML);
        setBodyEmpty(!event.target.innerText);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (body.length) {
            const { error } = await addNote({ title, body });
            if (!error) navigate('/');
        } else {
            setBodyEmpty(true);
        }
    };
    return (
        <>
            <TertiaryButton className="-ml-4 mb-4" onClick={() => history.back()}>
                <BackIcon />
                <p>{translate[language].back}</p>
            </TertiaryButton>
            <h2 className="list-title mb-8">{translate[language].addNewNote}</h2>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="title">{translate[language].noteTitle}</label>
                    <input
                        type="text"
                        id="title"
                        className="input-box"
                        value={title}
                        onChange={onTitleChangeHandler}
                    />
                    <span className="input-desc">
                        {translate[language].remainingCharacters}: {character}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="content" className={isBodyEmpty ? 'error-input' : ''}>
                        {translate[language].writeYourNote}
                    </label>
                    <div
                        id="content"
                        className={`input-box input-box-body ${
                            isBodyEmpty ? 'error-border-box' : ''
                        }`}
                        contentEditable
                        onInput={onBodyChangeHandler}></div>
                    <div className="error-message">
                        {isBodyEmpty && translate[language].cannotEmpty}
                    </div>
                </div>
                <div className="add-note">
                    <PrimaryButton type="submit" className="add-note-button">
                        <SaveIcon />
                        <p>{translate[language].saveNote}</p>
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
