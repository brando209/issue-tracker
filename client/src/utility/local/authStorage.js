const authTokenKey = "track_app_auth_token";

export function setLocalAuthToken(token) {
    localStorage.setItem(authTokenKey, token);
}

export function getLocalAuthToken() {
    return localStorage.getItem(authTokenKey);
}

export function removeLocalAuthToken() {
    localStorage.removeItem(authTokenKey);
}