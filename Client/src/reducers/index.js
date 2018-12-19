import authReducer from './authReducer';
import ajaxReducer from './ajaxReducer';
import playlistsReducer from './playlistsReducer';
import playlistReducer from './playlistReducer';

export default {
    auth: authReducer,
    ajax: ajaxReducer,
    playlists: playlistsReducer,
    playlist: playlistReducer
};