import { AUTHORIZATION_SUCCESS, REDIRECTED } from "../actions/actionTypes";

export default function authReducer(state = { success: false }, action) {
    switch (action.type) {
        case AUTHORIZATION_SUCCESS:
            return Object.assign({}, state, {success: true});
        case REDIRECTED:
            return Object.assign({}, state, {success: false});
        default:
            return state;
    }
};