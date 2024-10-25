type localStorageType = {
    key: 'string';
    value: 'string';
};

export function setLocalStorage({ key, value }: localStorageType): void {
    localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}

export function deleteLocalStorage(key: string): void {
    localStorage.removeItem(key);
}

export function clearLocalStorage(): void {
    localStorage.clear();
}
