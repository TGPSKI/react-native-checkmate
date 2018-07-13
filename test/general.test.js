const {
  dirCheck,
  dirsCheck,
  fileCheck,
  filesCheck,
  programCheck,
  programsCheck
} = require('../src/general.js');

const cwd = process.cwd().concat('/');

test('dir checks', () => {
  expect(dirCheck(cwd)).toBeTruthy();
  expect(dirCheck(cwd.concat('doesntExist'))).toBeFalsy();

  expect(dirsCheck([cwd, cwd.concat('test')])).toBeTruthy();
  expect(dirsCheck([cwd, cwd.concat('doesntExist')])).toEqual([
    `Directory "${cwd.concat('doesntExist')}" not found`
  ]);
});

test('file checks', () => {
  expect(fileCheck(`${cwd}test/general.test.js`)).toBeTruthy();
  expect(fileCheck(`${cwd}test/notfound.test.js`)).toBeFalsy();

  expect(filesCheck([`${cwd}test/general.test.js`, `${cwd}package.json`])).toBeTruthy();
  expect(filesCheck([`${cwd}test/general.test.js`, `${cwd}test/notfound.test.js`])).toEqual([
    `File "${cwd}test/notfound.test.js" not found`
  ]);
});

test('program checks', () => {
  expect(programCheck('time')).toBeTruthy();
  expect(programCheck('FOOBARBAZ')).toBeFalsy();

  expect(programsCheck(['time', 'date'])).toBeTruthy();
  expect(programsCheck(['time', 'FOOBARBAZ'])).toEqual([`Program "FOOBARBAZ" not found`]);
});
