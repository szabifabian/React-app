import React, { useState, useEffect } from 'react';
import { Modal } from 'semantic-ui-react';

const Field = ({ label, placeholder, name, value, onChange, ...attrs }) => {

    return (
        <div className="field">
            <label>{label}</label>
            <input name={name} value={value} onChange={onChange} type="text" placeholder={placeholder}  {...attrs} />
        </div>
    );
}

const defaultState = {
    artist: "",
    title: "",
    length: "",
    thumbnailURL: "",
    spotifyURL: "",
    chordsURL: "",
    lyricsURL: "",
}

export function TrackForm({ open, onClose, onSubmit, track }) {

    const [formstate, setFormState] = useState(defaultState);

    const resetFormState = (state) => setFormState(state);

    useEffect(() => {
        if (open) {
            resetFormState({ ...defaultState, ...track });
        }
    }, [open, track]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormState({ ...formstate, [name]: value })
    }


    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formstate);
        onClose();
    }

    return (

        <Modal as="form" open={open} onClose={onClose} onSubmit={handleSubmit} className="ui modal">
            <i onClick={onClose} className="close icon"></i>
            <div className="header">Add new Track</div>
            <div className="image content">
                <div className="description">
                    <div className="ui form">
                        <div className="three fields">
                            <Field required onChange={handleChange} name="artist" value={formstate.artist} label="Author" placeholder="John Williams" />
                            <Field required onChange={handleChange} name="title" value={formstate.title} label="Track name" placeholder="Imperial March" />
                            <Field onChange={handleChange} name="length" value={formstate.length} label="Length" placeholder="3:44" />
                        </div>
                        <div className="three fields">
                            <Field onChange={handleChange} name="spotifyURL" value={formstate.spotifyURL} label="Spotify URL" placeholder="https://" />
                            <Field onChange={handleChange} name="lyricsURL" value={formstate.lyricsURL} label="Lyrics URL" placeholder="https://" />
                            <Field onChange={handleChange} name="chordsURL" value={formstate.chordsURL} label="Guitar tab URL" placeholder="https://" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button onClick={onClose} className="ui black deny button">
                    Cancel</button>
                <button className="ui positive right labeled icon button">
                    Add
                <i className="plus icon"></i>
                </button>
            </div>
        </Modal >
    );
}
