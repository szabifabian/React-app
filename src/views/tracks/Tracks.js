import React, { useState } from 'react';
import { TrackForm } from './TrackForm';
import { Track } from './Track';

import { useSelector, useDispatch } from 'react-redux';
import { addTrack, updateTrack, deleteTrack } from '../../state/tracks/actions';
import { getTracks } from '../../state/tracks/selectors';

export function Tracks() {

    const tracks = useSelector(getTracks)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [editedTrack, setEditedTrack] = useState({});


    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = track => {
        if (!track.id) {
            //addNewTrack(track);
            dispatch(addTrack(track));
        } else {
            //editTrack(track);
            dispatch(updateTrack(track))
        }
    }

    const handleNew = () => {
        setEditedTrack({});
        handleOpen();
    }

    const handleEdit = track => {
        setEditedTrack(track);
        handleOpen();
    }

    const handleDelete = track => {
        dispatch(deleteTrack(track))
        //deleteTrack(track);
        //deleteTrackFromMultiplePlaylists(track.id);
    }

    return (
        <>
            <div className="ui container">
                <button onClick={handleNew} className="ui right floated green button" id="newModal">
                    <i className="plus icon"></i> New track</button>
                <h1>Tracks</h1>
                <table className="ui celled striped table">
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tracks.map(track =>
                            <Track onEdit={() => handleEdit(track)} onDelete={() => handleDelete(track)} key={track.id} track={track} />)}
                    </tbody>
                </table>
            </div>

            <TrackForm track={editedTrack} open={open} onClose={handleClose} onSubmit={handleSubmit} />
        </>
    );
}
