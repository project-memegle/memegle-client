type ValidateTypeProps = {
    VALIDATE_ENGLISH_LOWERCASE: string;
    VALIDATE_NUMBER: string;
    VALIDATE_SPECIAL_CHARACTERS: string;
};

const validateType: ValidateTypeProps = {
    VALIDATE_ENGLISH_LOWERCASE: 'a-z',
    VALIDATE_NUMBER: '0-9',
    VALIDATE_SPECIAL_CHARACTERS: '!@#$%^&*()_+[]{}|;:,.<>?/~`', // Add your desired special characters here
};

export default validateType;
