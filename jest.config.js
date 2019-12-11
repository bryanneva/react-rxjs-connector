module.exports = {
    preset: 'ts-jest',
    rootDir: '',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.[tj]s?(x)",
        "<rootDir>**/?(*.)+(spec|test).[tj]s?(x)"
    ],
};
