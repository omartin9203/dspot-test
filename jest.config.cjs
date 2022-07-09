module.exports = {
    // preset: 'ts-jest',
    // testEnvironment: 'node',
    globals: {
      'ts-jest': {
        // Relative path from the folder where jest.config.js is located
        astTransformers: ['./ts-jest-keys-transformer.js'],
      }
    },
    verbose: true,
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    testRegex: 'src/.*\\.spec\\.ts(x?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
    },
    // collectCoverage: false,
    coverageDirectory: 'coverage',
    // collectCoverageFrom: [
    //     'src/.*\\.spec\\.ts(x?)$'
    // ],
    coveragePathIgnorePatterns: [
        '^.+\\.d\\.ts$',
        'src/full\\.ts$'
    ]
};
