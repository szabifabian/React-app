import { playlistsStorage } from "../../api/PlaylistsStorage"
import { getPlaylists } from "./selectors"

export const ADD_PLAYLIST = "ADD_PLAYLIST"
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST"
export const SET_PLAYLISTS = "SET_PLAYLISTS"


//sync
export const setPlaylists = playlists => ({
    type: SET_PLAYLISTS,
    payload: playlists
})

export const addPLaylistToStore = playlist => ({
    type: ADD_PLAYLIST,
    payload: playlist
})

export const updatePlaylist = playlist => ({
    type: UPDATE_PLAYLIST,
    payload: playlist
})

//async
export const fetchPlaylists = () => async dispatch => {
    const playlists = await playlistsStorage.getAll()
    dispatch(setPlaylists(playlists))
}

export const addPlaylist = title => async dispatch => {
    const newPlaylist = await playlistsStorage.create({ title, tracks: [] })
    dispatch(addPLaylistToStore(newPlaylist))
}

export const addTrakcToPLaylist = (playlistId, trackId) => async (dispatch, getState) => {
    const playlists = getPlaylists(getState())
    const playlist = playlists.find(pl => pl.id === playlistId)
    if (!playlist) return

    if (playlist.tracks.includes(trackId)) return

    const modifiedPlaylist = { ...playlist, tracks: playlist.tracks.concat(trackId) }
    const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist)
    dispatch(updatePlaylist(updatedPlaylist))
}

export const deleteTrackFromAllPlaylists = track => async (dispatch, getState) => {
    const playlists = getPlaylists(getState())
    for (const playlist of playlists) {
        if (playlist.tracks.includes(track.id)) {
            const modifiedPlaylist = { ...playlist, tracks: playlist.tracks.filter(id => id !== track.id) }
            const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist)
            dispatch(updatePlaylist(updatedPlaylist))
        }
    }
}