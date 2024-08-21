// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// export default {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

// // jest.config.js
// module.exports = {
//   // other configuration options
//   // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
// };

// jest.config.cjs
// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  // other configuration options
};

