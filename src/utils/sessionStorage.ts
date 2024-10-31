type sessionStorageType = {
    key: string;
    value: string;
};

export function setSessionStorages({ key, value }: sessionStorageType): void {
    sessionStorage.setItem(key, value);
}

export function getSessionStorages(key: string): string | null {
    return sessionStorage.getItem(key);
}

export function deleteSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
}

export function clearSessionStorage(): void {
    sessionStorage.clear();
}
