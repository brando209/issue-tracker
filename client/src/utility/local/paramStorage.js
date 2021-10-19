const paramKey = "list_filter_params";

export function setLocalParamStorage(params) {
    localStorage.setItem(paramKey, JSON.stringify(params));
}

export function getLocalParamStorage() {
    return JSON.parse(localStorage.getItem(paramKey));
}

export function removeLocalParamStorage() {
    localStorage.removeItem(paramKey);
}