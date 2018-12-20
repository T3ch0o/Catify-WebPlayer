import { appKey, appSecret } from '../utils/API';

const user = {
    login: function(payload) {
        return fetch(`https://baas.kinvey.com/user/${appKey}/login`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    register: function(payload) {
        return fetch(`https://baas.kinvey.com/user/${appKey}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    logout: function() {
        return fetch(`https://baas.kinvey.com/user/${appKey}/_logout`, {
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    get: function() {
        return fetch(`https://baas.kinvey.com/user/${appKey}/_me`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    },
    update: function(payload, id) {
        return fetch(`https://baas.kinvey.com/user/${appKey}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    }
};

export default user;