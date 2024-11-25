import validateSignUpPassword from 'components/Validations/ValidateSignUpPassword';
import { ChangeEvent } from 'react';

const passwordCheckHandler = (
    valueSetter: React.Dispatch<React.SetStateAction<string>>,
    otherValue: string,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    additionalCallback?: () => void
) => {

    return (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        const error = validateSignUpPassword(value, otherValue);

        valueSetter(value);
        errorSetter(error);
        if (additionalCallback) {
            additionalCallback();
        }
    };
};

export default passwordCheckHandler;
