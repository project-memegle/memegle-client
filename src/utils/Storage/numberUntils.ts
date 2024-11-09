export const getEnvVariableAsNumber = (
    envVar: string | undefined,
    varName: string
): number => {
    if (envVar === undefined) {
        throw new Error(`Environment variable ${varName} is not defined`);
    }

    const value = Number(envVar);
    if (isNaN(value)) {
        throw new Error(`Invalid ${varName} value`);
    }
    return value;
};
