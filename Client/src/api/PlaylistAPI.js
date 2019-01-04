import axios from 'axios';

const playlist = {
    get: function(id) {
        return axios.get(`https://localhost:44336/api/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    getAll: function() {
        return axios.get(`https://localhost:44336/api/playlist/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    },
    getMusicTitle: function(link) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        return axios.get(proxyurl + link)
            .then(response => response.data);
    },
    create: function(payload) {
        return axios.post(`https://localhost:44336/api/playlist`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    addSong: function(payload, id) {
        return axios.post(`https://localhost:44336/api/song/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    removeSong: function(id) {
        return axios.delete(`https://localhost:44336/api/song/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    },
    update: function(payload, id) {
        return axios.put(`https://localhost:44336/api/playlist/update/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    edit: function(payload, id) {
        return axios.put(`https://localhost:44336/api/playlist/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    delete: function(id) {
        return axios.delete(`https://localhost:44336/api/playlist/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(res => res.json());
    },
    uploadPlaylistImage: function(payload, id) {
        return axios.post(`https://localhost:44336/api/image/${id}`, payload,{
            headers: {
                'Content-Type':'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }}
        )
    }
};

export default playlist;