import { AUTHORIZATION_SUCCESS, REDIRECTED } from "./actionTypes";
import { beginAction } from './ajaxActions';
import remote from "../utils/remote";

function success() {
    return {
        type: AUTHORIZATION_SUCCESS
    };
}

export function redirectToPage() {
    return {
        type: REDIRECTED
    };
}

export function registerAction(payload) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.register(payload)
            .then(response => {
                localStorage.setItem('user', response.username);
                localStorage.setItem('authToken', response._kmd.authtoken);
                localStorage.setItem('role', response.role);
                dispatch(success());
            });
    };
}

export function loginAction(payload) {
    return function(dispatch) {
        dispatch(beginAction());
        return remote.login(payload)
            .then(response => {
                localStorage.setItem('user', response.username);
                localStorage.setItem('authToken', response._kmd.authtoken);
                localStorage.setItem('role', response.role);
                dispatch(success());
            });
    };
}

export function logoutAction() {
    return function(dispatch) {
        remote.logout()
            .then(response => {
                localStorage.clear();
            });
    };
}

export function userAction() {
    return function(dispatch) {
        return remote.getUser();
    }
}

export function updateUserAction(payload, id) {
    return function(dispatch) {
        return remote.updateUser(payload, id);
    }
}