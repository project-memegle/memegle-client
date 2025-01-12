type sessionStorageType = {
    key: string;
    value: string;
};
type sessionStorageArrayType = {
    key: string;
    value: any[];
};

export function setSessionStorages({ key, value }: sessionStorageType): void {
    sessionStorage.setItem(key, value);
}
export function setArraySessionStorages({
    key,
    value,
}: sessionStorageArrayType): void {
    const jsonValue = JSON.stringify(value);
    sessionStorage.setItem(key, jsonValue);
}

export function getSessionStorages(key: string): string | null {
    return sessionStorage.getItem(key);
}

export function getArraySessionStorages(
    key: string
): { value: any[] }[] | null {
    const jsonValue = sessionStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
}
export function deleteSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
}

export function clearSessionStorage(): void {
    sessionStorage.clear();
}
