import { AUTHORIZATION_SUCCESS, REDIRECTED } from "./actionTypes";
import { beginAction } from './ajaxActions';
import user from "../api/UserAPI";

function success() {
    return {
        type: AUTHORIZATION_SUCCESS
    };
}

function saveToLocalStorage(response) {
    localStorage.setItem('user', response.username);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('role', response.role);
}

export function redirectToPage() {
    return {
        type: REDIRECTED
    };
}

export function registerAction(payload) {
    return function(dispatch) {
        dispatch(beginAction());
        return user.register(payload)
            .then(response => {
                if (response.message) {
                    throw Error();
                }

                saveToLocalStorage(response);
                dispatch(success());
            });
    };
}

export function loginAction(payload) {
    return function(dispatch) {
        dispatch(beginAction());
        return user.login(payload)
            .then(response => {
                if (response.message) {
                    throw Error();
                }

                saveToLocalStorage(response);
                dispatch(success());
            })
    };
}

export function logoutAction() {
    return function(dispatch) {
        user.logout()
            .then(response => {
                localStorage.clear();
            });
    };
}

export function userAction() {
    return function(dispatch) {
        return user.get();
    }
}

export function updateUserAction(payload, id) {
    return function(dispatch) {
        return user.update(payload, id);
    }
}