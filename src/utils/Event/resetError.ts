export const resetErrors = (
    ...setters: React.Dispatch<React.SetStateAction<string>>[]
) => {
    setters.forEach((setError) => setError(''));
};
