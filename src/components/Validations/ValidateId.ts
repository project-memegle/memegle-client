import ValidationMessages from './ValidationMessages';
import ValidateSpace from './ValidateSpace';
import validateType from './ValidateType';

const validateId = (id: string) => {
    const trimmedId = ValidateSpace(id);
    console.log('====================================');
    console.log('validateId -> trimmedId', trimmedId);
    console.log('====================================');
    if (!trimmedId) {
        return ValidationMessages.REQUIRED_ID;
    }
    if (trimmedId.length < 6) {
        return ValidationMessages.INVALID_ID_LENGTH;
    }
    const regex = new RegExp(
        `^[${validateType.VALIDATE_ENGLISH_LOWERCASE}${validateType.VALIDATE_NUMBER}]+$`
    );
    if (!regex.test(trimmedId)) {
        return ValidationMessages.INVALID_ID_TYPE;
    }
    return '';
};

export default validateId;
