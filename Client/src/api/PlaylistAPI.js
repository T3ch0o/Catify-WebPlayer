import { appKey } from '../utils/API';

const playlist = {
    get: function(id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey a4fb937d-eb4e-48c2-8381-08a579ff03cf.0wlBNdB7VuEMh7s+rTLxlV54dHO0mowkXQ5tiOxS9AU=`
            }
        })
            .then(res => res.json());
    },
    getAll: function() {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey a4fb937d-eb4e-48c2-8381-08a579ff03cf.0wlBNdB7VuEMh7s+rTLxlV54dHO0mowkXQ5tiOxS9AU=`
            }
        })
            .then(res => res.json());
    },
    getMusicTitle: function(link) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        return fetch(proxyurl + link)
            .then(res => res.text());
    },
    create: function(payload) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    update: function(payload, id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Kinvey 28413438-000a-4776-b865-3dc0135093f0.Q9c5b5i+a4LJ/z/zC5fBnY+NBdsY72mDzwm3JqqfrIk=`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    edit: function(payload, id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    delete: function(id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    }
};

export default playlist;