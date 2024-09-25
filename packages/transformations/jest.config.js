module.exports = {
    roots: ['<rootDir>/src'], // Look for test files in the src directory
    testEnvironment: 'node', // or 'jsdom' if you're testing frontend code
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for ts/tsx files
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$', // Match test/spec files
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'], // File types to process
  };