import { REQUEST_PLAYLISTS, REQUEST_PLAYLIST } from './actionTypes';
import remote from "../utils/remote";
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
        remote.getPlaylists()
            .then(data => {
                dispatch(requestPlaylists(data));
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function createPlaylistAction(payload) {
    return function(dispatch) {
        return remote.createPlaylist(payload)
            .catch(error => dispatch(errorAction()));
    }
}

export function getMusicTitleAction(link) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.getMusicTitle(link)
            .catch(error => dispatch(errorAction()));
    }
}


export function editPlaylistAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.editPlaylist(payload, id)
            .then(data => {
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function updatePlaylistAction(payload, id) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.updatePlaylist(payload, id)
            .then(data => {
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}

export function deletePlaylist(id) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.deletePlaylist(id)
            .catch(error => dispatch(errorAction()));
    }
}

export function requestPlaylistAction(id) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.getPlaylist(id)
            .then(data => {
                dispatch(requestPlaylist(data));
                dispatch(successAction());
            })
            .catch(error => dispatch(errorAction()));
    }
}