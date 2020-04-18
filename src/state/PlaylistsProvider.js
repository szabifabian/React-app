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

    //service
    const playlistsService = { playlists, addNewPlaylist };

    return playlistsService;

}

export const PlaylistsContext = React.createContext();
export const PlaylistsProvider = ({ children }) => {

    const playlistsService = usePlaylistsService();
    return <PlaylistsContext.Provider value={playlistsService}>{children}</PlaylistsContext.Provider>
}