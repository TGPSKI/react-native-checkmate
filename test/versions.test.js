const { versionsCheck } = require('../src/versions.js');

const shell = require('shelljs');
shell.config.shell = process.env.SHELL;
shell.config.silent = true;

test('versions check', () => {
  const versionObj = {
    doesntExist: '0.0.0'
  };
  expect(() => versionsCheck(versionObj)).toThrow();

  delete versionObj.doesntExist;

  versionObj.macOS = shell
    .exec('sw_vers')
    .exec('grep ProductVersion')
    .stdout.replace('ProductVersion:\t', '')
    .replace('\n', '');

  expect(versionsCheck(versionObj)).toBeTruthy();
});
