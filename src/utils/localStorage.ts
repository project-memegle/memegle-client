import { Nullable } from './nullable';

type LocalStorageItem = {
    key: string;
    value: string;
};

export const SEARCH_HISTORY = 'SEARCH_HISTORY';

export function setLocalStorage({ key, value }: LocalStorageItem): void {
    localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): Nullable<string> {
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

export function deleteSearchHistroy(index: number): void {
    const history = getSearchHistory();
    if (index >= 0 && index < history.length) {
        history.splice(index, 1);
        localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
    }
}

export function clearSearchHistory(): void {
    localStorage.removeItem(SEARCH_HISTORY);
}
