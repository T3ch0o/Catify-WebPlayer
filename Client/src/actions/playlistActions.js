import { REQUEST_PLAYLISTS, REQUEST_PLAYLIST } from './actionTypes';
import playlist from "../api/PlaylistAPI";
import { errorAction, successAction, beginAction } from './ajaxActions';

function requestPlaylists(data) {
    return {
        type: REQUEST_PLAYLISTS,
        data
    }
}

function requestPlaylist(data) {
    return {
        type: REQUEST_PLAYLIST,
        data
    }
}

export function requestPlaylistsAction() {
    return function(dispatch) {
        dispatch(beginAction());
        playlist.getAll()
            .then(data => {
                dispatch(requestPlaylists(data));
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
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
            .then(data => {
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function updatePlaylistAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.update(payload, id)
            .then(data => {
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

export function requestPlaylistAction(id) {
    return function(dispatch) {
        dispatch(beginAction());
        return playlist.get(id)
            .then(data => {
                dispatch(requestPlaylist(data));
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}