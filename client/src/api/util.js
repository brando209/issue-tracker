export function authHeader(authToken) {
    return { 'Authorization': `Bearer ${authToken}`}
}