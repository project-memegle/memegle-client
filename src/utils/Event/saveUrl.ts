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
