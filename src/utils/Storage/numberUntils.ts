export const getEnvVariableAsNumber = (
    envVar: string | undefined,
    varName: string
): number => {
    const value = Number(envVar);
    if (isNaN(value)) {
        throw new Error(`Invalid ${varName} value`);
    }
    return value;
};
