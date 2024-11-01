import { ChangeEvent } from "react";

const handleInputChange = (
    valueSetter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    validator: (value: string) => string,
    additionalCallback?: () => void
) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        const error = validator(value);
        valueSetter(value);
        errorSetter(error);
        if (additionalCallback) {
            additionalCallback();
        }
    };
};

export default handleInputChange;