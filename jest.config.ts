import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.jest.json',
            },
        ],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!react-dnd|dnd-core|react-dnd-html5-backend)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
