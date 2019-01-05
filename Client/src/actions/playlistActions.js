import { REQUEST_PLAYLISTS, REQUEST_PLAYLIST } from './actionTypes';
import playlist from "../api/PlaylistAPI";
import { errorAction, successAction, beginAction } from './ajaxActions';

function getPlaylists(data) {
    return {
        type: REQUEST_PLAYLISTS,
        data
    }
}

function getPlaylist(data) {
    return {
        type: REQUEST_PLAYLIST,
        data
    }
}

export function getPlaylistsAction() {
    return function(dispatch) {
        dispatch(beginAction());
        playlist.getAll()
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(getPlaylists(response.data));
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function getPlaylistAction(id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.get(id)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(getPlaylist(response.data));
                dispatch(successAction());
            })
    }
}

export function createPlaylistAction(payload) {
    return function(dispatch) {
        return playlist.create(payload)
            .catch(error => dispatch(errorAction()));
    }
}

export function getMusicTitleAction(link) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.getMusicTitle(link)
            .catch(error => dispatch(errorAction()));
    }
}


export function editPlaylistAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.edit(payload, id)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function updatePlaylistStatusAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.update(payload, id)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function uploadPlaylistImageAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.uploadPlaylistImage(payload, id)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function deletePlaylist(id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.delete(id)
            .catch(error => dispatch(errorAction()));
    }
}

export function addSongToPlaylistAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.addSong(payload, id)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function removeSongFromPlaylistAction(id, title) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.removeSong(id, title)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}