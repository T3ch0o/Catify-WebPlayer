import { appKey, appSecret } from '../utils/API';

const user = {
    login: function(payload) {
        return fetch(`https://localhost:44336/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    register: function(payload) {
        return fetch(`https://localhost:44336/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    logout: function() {
        return fetch(`https://localhost:44336/api/user/logout`, {
            method: 'GEt',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    get: function() {
        return fetch(`https://localhost:44336/api/user/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
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