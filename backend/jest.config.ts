import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.json',
      },
    ],

  },
  moduleNameMapper: {
    '^(\.\.?/.*)\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'cjs', 'json', 'node'],

};

export default config;
