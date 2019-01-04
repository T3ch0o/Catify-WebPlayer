import { AUTHORIZATION_SUCCESS, REDIRECTED } from "./actionTypes";
import { beginAction, errorAction } from './ajaxActions';
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
                if (response.status !== 200) {
                    throw Error();
                }

                saveToLocalStorage(response.data);
                dispatch(success());
            });
    };
}

export function loginAction(payload) {
    return function(dispatch) {
        dispatch(beginAction());
        return user.login(payload)
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                saveToLocalStorage(response.data);
                dispatch(success());
            });
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
        return user.get()
            .then(response => {
                if (response.status !== 200) {
                    throw Error();
                }

                return response.data;
            })
            .catch(error => dispatch(errorAction()));
    };
}