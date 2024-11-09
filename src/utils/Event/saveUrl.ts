import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';

export const savePreviousUrl = (url: string) => {
    setSessionStorages({ key: 'previousUrl', value: url });
};

export const getPreviousUrl = (): string | null => {
    return getSessionStorages('previousUrl');
};

export const deletePreviousUrl = () => {
    deleteSessionStorage('previousUrl');
};

export const getLastKeywordFromUrl = <T>(): T | undefined => {
    const url = window.location.href;
    const keywords = url.split('/');
    const lastKeyword = keywords.pop();

    if (lastKeyword !== undefined) {
        return isNaN(Number(lastKeyword))
            ? (lastKeyword as T)
            : (Number(lastKeyword) as T);
    }
    return undefined;
};
