const { envVarsCheck } = require('../src/env.js');

test('env vars', () => {
  expect(envVarsCheck(['HOME', 'SHELL'])).toBeTruthy();
  expect(envVarsCheck(['NOPE', 'DOESNT_EXIST'])).toEqual([
    '"NOPE" variable is undefined',
    '"DOESNT_EXIST" variable is undefined'
  ]);
});
