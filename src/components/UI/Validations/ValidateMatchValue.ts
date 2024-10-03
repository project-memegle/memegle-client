const validateMatchValue = (value: string, matchValue: string): boolean => {
    if (value !== matchValue) {
        return false;
    }
    return true;
};

export default validateMatchValue;
