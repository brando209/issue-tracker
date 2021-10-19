import axios from 'axios';
import { setLocalAuthToken, getLocalAuthToken, removeLocalAuthToken } from '../utility/local/authStorage';

const auth = {
    isAuthenticated: false, 
    async login(credentials, cb) {
        try{
            const response = await axios.post(
                '/api/auth/login', 
                { 
                    userName: credentials.userName, 
                    password: credentials.password 
                }
            );
            auth.isAuthenticated = true;
            setLocalAuthToken(response.data.token);
            cb({ ...response.data.user, token: response.data.token }, null);
            return response.data;
        } catch(err) {
            auth.isAuthenticated = false;
            cb(null, { message: err.response.data.message });
        }
    },
    async tokenLogin(cb) {
        const token = getLocalAuthToken();

        if(!token) {
            auth.isAuthenticated = false;
            console.log("Token not found");
            cb(null);
            return;
        }

        console.log("Token found");
        let response = null;
        try {
            response = await axios.get(
                '/api/user/login',
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            auth.isAuthenticated = true;
            cb({ ...response.data, token }, null);
        } catch(err) {
            auth.isAuthenticated = false;
            cb(null, { message: err.message });
        }

        return response;
    },
    async signup(user, cb) {
        try {
            const response = await axios.post(
                '/api/auth/register',
                { ...user }
            );
            console.log(response);
            cb(response.data, null);
            return response.data;
        } catch(err) {
            cb(null, { message: err.message });
        }
    },
    async logout(cb) {
        auth.isAuthenticated = false;
        removeLocalAuthToken();
        cb();
    }, 
    async changePassword(currentPassword, newPassword, token, cb) {
        try {
            console.log("authApi", { currentPassword, newPassword });
            const response = await axios.patch(
                '/api/user/changePassword',
                { currentPassword, newPassword },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            console.log(response);
            cb(null);
            return response.data;
        } catch(err) {
            cb({ message: err.response.data.message });
        }
    }
}

export default auth;