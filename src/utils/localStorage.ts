type localStorageType = {
    key: 'string';
    value: 'string';
};

export const SEARCH_HISTORY = 'SEARCH_HISTORY';

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

export function getSearchHistory(): string[] {
    const history = localStorage.getItem(SEARCH_HISTORY);
    return history ? JSON.parse(history) : [];
}
export function addSearchHistory(value: string): void {
    const trimmedValue = value.trim();
    const history = getSearchHistory();
    if (trimmedValue && !history.includes(trimmedValue)) {
        history.push(trimmedValue);
        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
    }
}
