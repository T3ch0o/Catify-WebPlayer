const playlist = {
    get: function(id) {
        return fetch(`https://localhost:44336/api/playlist/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },
    getAll: function() {
        return fetch(`https://localhost:44336/api/playlist/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
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
        return fetch(`https://localhost:44336/api/playlist`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    addSong: function(payload, id) {
        return fetch(`https://localhost:44336/api/song/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    removeSong: function(id) {
        return fetch(`https://localhost:44336/api/song/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    },
    update: function(payload, id) {
        return fetch(`https://localhost:44336/api/playlist/update/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    edit: function(payload, id) {
        return fetch(`https://localhost:44336/api/playlist/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json());
    },
    delete: function(id) {
        return fetch(`https://localhost:44336/api/playlist/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    }
};

export default playlist;