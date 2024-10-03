import {
    useCallback,
    useState,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';

const useInput = <T>(initialData: T) => {
    const [value, setValue] = useState<T>(initialData);
    const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as T);
    }, []);

    return [value, handler, setValue] as [
        T,
        (e: ChangeEvent<HTMLInputElement>) => void,
        Dispatch<SetStateAction<T>>
    ];
};

export default useInput;
