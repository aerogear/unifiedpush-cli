module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    "coveragePathIgnorePatterns": [
        "<rootDir>/src/index.ts",
        "<rootDir>/src/cmds/applications.ts",
        "<rootDir>/src/cmds/variants.ts",
    ],
    roots: [
        'test',
        'src'
    ]
};
