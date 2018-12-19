import { REQUEST_PLAYLIST } from '../actions/actionTypes';

export default function playlistReducer(state = { song: 0 }, action) {
    switch (action.type) {
        case REQUEST_PLAYLIST:
            return Object.assign({ song: 0 }, action.data);
        default:
            return state;
    }
};
