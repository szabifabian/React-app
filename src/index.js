import React from 'react';
import ReactDOM from 'react-dom';

import 'fomantic-ui-css/semantic.min.css';

import { App } from "./views/App";
import { PlaylistsProvider } from './state/PlaylistsProvider';
import { TracksProvider } from './state/TracksProvider';

const render = () =>
  ReactDOM.render(
    <React.StrictMode>
      <TracksProvider>
        <PlaylistsProvider>
          <App />
        </PlaylistsProvider>
      </TracksProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

async function start() {
  /*const newPlaylist = await playlistsStorage.create({ title: 'Something', tracks: [] })
  console.log(newPlaylist);*/

  //const newPlaylists = await playlistsStorage.fill(examplePlaylists); //töröl, újra berakja a példánk alapján a playlistet

  render();
}
start();