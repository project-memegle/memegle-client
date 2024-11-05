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

export const getLastKeywordFromUrl = (): string | undefined => {
    const url = window.location.href; // 현재 URL을 가져옵니다.
    const keywords = url.split('/'); // '/' 기준으로 분리합니다.
    return keywords.pop(); // 마지막 키워드를 반환합니다.
};

const lastKeyword = getLastKeywordFromUrl();
