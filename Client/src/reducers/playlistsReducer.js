import { REQUEST_PLAYLISTS } from '../actions/actionTypes';

export default function playlistReducer(state = [], action) {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return reconcile(state, action.data);
        default:
            return state;
    }
};

function reconcile(oldData, newData) {
    const newDataById = {};
    for (const entry of newData) {
        newDataById[entry.id] = entry;
    }

    const result = [];

    for (const entry of oldData) {
        if (!newDataById[entry.id]) {
            continue;
        }

        if (newDataById[entry.id]) {
            result.push(newDataById[entry.id]);
            delete newDataById[entry.id];
        } else {
            result.push(entry);
        }
    }

    for (const id in newDataById) {
        result.push(newDataById[id]);
    }

    result.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

    return result;
}