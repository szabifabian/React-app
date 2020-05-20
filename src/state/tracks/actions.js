import { tracksStorage } from "../../api/TracksStorage"
import { deleteTrackFromAllPlaylists } from "../playlists/actions"

export const ADD_TRACK = "ADD_TRACK"
export const UPDATE_TRACK = "UPDATE_TRACK"
export const DELETE_TRACK = "DELETE_TRACK"
export const SET_TRACKS = "SET_TRACKS"


//sync
export const setTracks = tracks => ({
    type: SET_TRACKS,
    payload: tracks
})

export const addTrackToStore = track => ({
    type: ADD_TRACK,
    payload: { ...track, id: Date.now().toString() }
})

export const updateTrackInStore = track => ({
    type: UPDATE_TRACK,
    payload: track
})

export const deleteTrackFromStore = track => ({
    type: DELETE_TRACK,
    payload: track
})

export const addTrack = track => async dispatch => {
    const newTrack = await tracksStorage.create(track)
    dispatch(addTrackToStore(newTrack))
}

export const updateTrack = track => async dispatch => {
    const updatedTrack = await tracksStorage.update(track)
    dispatch(updateTrackInStore(updatedTrack))
}


//async
export const fetchTracks = () => async dispatch => {
    const tracks = await tracksStorage.getAll()
    dispatch(setTracks(tracks))
}



export const deleteTrack = track => async dispatch => {
    await tracksStorage.delete(track.id) //nedb-ben kitörli
    dispatch(deleteTrackFromStore(track))   //ez pedig a memóriabeli elemet törli ki a store-ból
    dispatch(deleteTrackFromAllPlaylists(track))

}
