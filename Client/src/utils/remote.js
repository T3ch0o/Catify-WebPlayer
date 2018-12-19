const appKey = 'kid_S1M9BFof7';
const appSecret = 'cfbc192202ad4ab68ac9ddb0556fcb7d';

const remote = {
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
    getPlaylists: function() {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey a4fb937d-eb4e-48c2-8381-08a579ff03cf.0wlBNdB7VuEMh7s+rTLxlV54dHO0mowkXQ5tiOxS9AU=`
            }
        })
            .then(res => res.json());
    },
    getUser: function() {
        return fetch(`https://baas.kinvey.com/user/${appKey}/_me`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    },
    updateUser: function(payload, id) {
        return fetch(`https://baas.kinvey.com/user/${appKey}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    createPlaylist: function(payload) {
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
    getMusicTitle: function(link) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        return fetch(proxyurl + link)
            .then(res => res.text());
    },
    editPlaylist: function(payload, id) {
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
    deletePlaylist: function(id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Kinvey ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    },
    getPlaylist: function(id) {
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/playlists/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Kinvey a4fb937d-eb4e-48c2-8381-08a579ff03cf.0wlBNdB7VuEMh7s+rTLxlV54dHO0mowkXQ5tiOxS9AU=`
            }
        })
            .then(res => res.json());
    },
    updatePlaylist: function(payload, id) {
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
};

export default remote;
