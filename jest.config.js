module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "@exmpl/(.*)": "<rootDir>/server/$1"
    },
  };