import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import { tracksReducer } from "./tracks/reducer";
import { playlistsReducer } from "./playlists/reducer";


const rootReducer = combineReducers({
    tracks: tracksReducer,
    playlists: playlistsReducer
})

const logger = createLogger({
    // ...options
    collapsed: true
});


export const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))
}