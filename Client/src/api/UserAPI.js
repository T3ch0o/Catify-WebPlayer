import axios from 'axios';

const user = {
    login: function(payload) {
        return axios.post(`https://localhost:44336/api/user/login`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    register: function(payload) {
        return axios.post(`https://localhost:44336/api/user/register`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    logout: function() {
        return axios.get(`https://localhost:44336/api/user/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
    },
    get: function() {
        return axios.get(`https://localhost:44336/api/user/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }
};

export default user;