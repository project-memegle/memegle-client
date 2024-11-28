import { useState, useCallback, useRef } from 'react';
import { errorInputCheck } from 'utils/Event/errorInputCheck';
import handleInputChange from 'utils/Event/handleInputChange';

export function useInput(
    validateFn: (value: string) => string,
    defaultMessage: string
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isDuplicated, setIsDuplicated] = useState<boolean>(false);

    const onChange = useCallback(
        handleInputChange(setValue, setErrorMessage, validateFn, () => {
            setErrorMessage('');
            setSuccessMessage('');
            setIsChecked(false);
            setIsDuplicated(false);
        }),
        []
    );

    const onSubmitCheck = useCallback(
        async (
            checkFn: (data: { [key: string]: string }) => Promise<boolean>,
            fieldName: string
        ) => {
            if (errorMessage || !value) {
                errorInputCheck(inputRef.current);
                setErrorMessage(defaultMessage);
                setSuccessMessage('');
                return;
            }

            try {
                const response = await checkFn({ [fieldName]: value });
                setIsChecked(true);
                setErrorMessage('');
                setSuccessMessage(response ? 'Success' : '');
                setIsDuplicated(!response);
            } catch {
                setErrorMessage('Error checking');
            }
        },
        [value, errorMessage, defaultMessage]
    );

    return {
        inputRef,
        value,
        errorMessage,
        successMessage,
        isChecked,
        isDuplicated,
        onChange,
        onSubmitCheck,
    };
}
