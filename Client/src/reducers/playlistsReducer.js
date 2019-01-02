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
        newDataById[entry._id] = entry;
    }

    const result = [];

    for (const entry of oldData) {
        if (!newDataById[entry._id]) {
            continue;
        }

        if (newDataById[entry._id]) {
            result.push(newDataById[entry._id]);
            delete newDataById[entry._id];
        } else {
            result.push(entry);
        }
    }

    for (const id in newDataById) {
        result.push(newDataById[id]);
    }

    result.sort((a, b) => a.creationDate < b.creationDate);

    return result;
}