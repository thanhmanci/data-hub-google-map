export function storageDataHub(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getDataHubFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}