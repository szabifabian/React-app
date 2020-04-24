import React, { useState, useEffect } from 'react';
import { playlistsStorage } from '../api/PlaylistsStorage';


//saját hook
const usePlaylistsService = () => {
    //data
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getAll = async () => setPlaylists(await playlistsStorage.getAll());
        getAll();
    }, [])

    //operations

    const addNewPlaylist = async title => {
        //create in storage layer
        const newPlaylist = await playlistsStorage.create({ title, tracks: [] })
        //const id = playlists.reduce((maxId, pl) => Math.max(maxId, pl.id), 0) + 1;
        setPlaylists([...playlists, newPlaylist]);
    }

    const deleteTrackFromPlaylist = async (playlist, trackId) => {
        const modifiedPlaylist = { ...playlist, tracks: playlist.tracks.filter(id => id !== trackId) };
        return await playlistsStorage.update(modifiedPlaylist);
    }

    const deleteTrackFromMultiplePlaylists = async trackId => {
        setPlaylists(await Promise.all(playlists.map(async playlist => await deleteTrackFromPlaylist(playlist, trackId))));
    }

    const addTrackToPlaylist = async (playlistId, trackId) => {
        const playlist = playlists.find(pl => pl.id === playlistId);
        if (!playlist) return;

        if (playlist.tracks.includes(trackId)) return;

        const modifiedPlaylist = { ...playlist, tracks: playlist.tracks.concat(trackId) };
        const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist);

        setPlaylists(playlists.map(pl => pl.id !== playlistId ? pl : updatedPlaylist));
    }

    //service
    const playlistsService = { playlists, addNewPlaylist, deleteTrackFromMultiplePlaylists, addTrackToPlaylist };

    return playlistsService;

}

export const PlaylistsContext = React.createContext();
export const PlaylistsProvider = ({ children }) => {

    const playlistsService = usePlaylistsService();
    return <PlaylistsContext.Provider value={playlistsService}>{children}</PlaylistsContext.Provider>
}