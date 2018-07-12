#!/usr/bin/env node

const util = require('util');
const shell = require('shelljs');

const {
  dirCheck,
  dirsCheck,
  fileCheck,
  filesCheck,
  programCheck,
  programsCheck
} = require('./general.js');

const { versionsCheck } = require('./versions.js');
const { yarnIntegrityCheck, nodePathCheck } = require('./node.js');
const { iosPodCheck } = require('./ios.js');
const { gradleTasksCheck } = require('./android.js');
const { envVarsCheck } = require('./env.js');

const cwd = process.cwd().concat('/');

const { checkmate } = require(`${cwd}package.json`);

if (checkmate == null) {
  throw Error('❌ Checkmate object not present in package.json');
}

const newline = () => console.log('');
const lineBreak = () => console.log('--------------------------');

///////////////////
///////////////////
///// EXECUTE /////
///////////////////
///////////////////

(function() {
  const verbose = checkmate.verbose;

  lineBreak();
  console.log('Checkmate for React Native');
  lineBreak();

  if (verbose) {
    console.log('Current working directory:');
    console.log(cwd);
    newline();
    console.log('Checkmate parameters:');
    console.log(util.inspect(checkmate, false, null));
    lineBreak();
  }

  if (checkmate.shellPath) {
    shell.config.shell = checkmate.shellPath;
  }

  if (checkmate.silentShell || !checkmate.verbose) {
    shell.config.silent = true;
  } else {
    shell.config.silent = false;
  }

  delete checkmate.verbose;
  delete checkmate.shellPath;
  delete checkmate.silentShell;

  const checkKeys = Object.keys(checkmate);
  const errors = [];

  checkKeys.forEach(key => {
    const checkOutput = checkSwitch(key, checkmate[key]);
    if (checkOutput.constructor === Array) {
      errors.push({
        [key]: checkOutput
      });
    }
  });

  if (errors.length) {
    lineBreak();
    console.log('ERRORS');
    console.log(util.inspect(errors, false, null));
    newline();
    throw Error('❌ Checkmate FAILURE');
  }

  lineBreak();
  console.log('✅ Checkmate SUCCESS');
  lineBreak();
})();

// Associates check/challenge pairs with check functions
function checkSwitch(check, challenges) {
  switch (check) {
    case 'programs': {
      console.log('* Programs');
      return programsCheck(challenges);
    }
    case 'versions': {
      console.log('* Versions');
      return versionsCheck(challenges);
    }
    case 'envVars': {
      console.log('* ENV variables');
      return envVarsCheck(challenges);
    }
    case 'env': {
      console.log('* ENV files');
      const envDir = cwd.concat(challenges.dir);

      return filesCheck(challenges.buildTypes.map(challenge => `${envDir}/env.${challenge}`));
    }
    case 'node': {
      console.log('* Node / Yarn');
      const errors = [];

      if (challenges.yarnIntegrity) {
        console.log('** Yarn integrity');

        const yarnIntegrity = yarnIntegrityCheck(cwd);
        if (!yarnIntegrity) {
          errors.push(`Yarn integrity failure.`);
        }
      }

      const dirsFilesCheck = checkDirsFiles(challenges);
      if (dirsFilesCheck.constructor === Array) {
        errors.push(...dirsFilesCheck);
      }

      return errors.length ? errors : true;
    }
    case 'android': {
      console.log('* Android');
      const errors = [];

      if (challenges.nodePath) {
        console.log('** Node path');
        if (!nodePathCheck('android', cwd)) {
          errors.push('Android node path not set in $HOME/.gradle/settings.gradle');
        }
      }

      if (challenges.gradle) {
        console.log('** Gradle tasks');
        if (!gradleTasksCheck(cwd)) {
          errors.push(
            'Gradle tasks are unrunnable. "cd ./android && .gradlw tasks --verbose" for more information'
          );
        }
      }

      const dirsFilesCheck = checkDirsFiles(challenges, (subDir = 'android'));
      if (dirsFilesCheck.constructor === Array) {
        errors.push(...dirsFilesCheck);
      }

      return errors.length ? errors : true;
    }
    case 'ios': {
      console.log('* iOS');
      const errors = [];

      if (challenges.nodePath) {
        console.log('** Node path');
        const nodePath = `${cwd}${challenges.nodePathDir}/${challenges.nodePathFilename}`;
        if (!nodePathCheck('ios', cwd, (customPath = nodePath))) {
          errors.push(`iOS node path not set in "${nodePath}"`);
        }
      }

      if (challenges.pods) {
        console.log('** Pod sync');
        if (!iosPodCheck(cwd)) {
          errors.push('Podfile out of sync.');
        }
      }

      const dirsFilesCheck = checkDirsFiles(challenges, (subDir = 'ios'));
      if (dirsFilesCheck.constructor === Array) {
        errors.push(...dirsFilesCheck);
      }

      return errors.length ? errors : true;
    }
    case 'other': {
      console.log('* Other');
      const errors = [];

      const dirsFilesCheck = checkDirsFiles(challenges);
      if (dirsFilesCheck.constructor === Array) {
        errors.push(...dirsFilesCheck);
      }

      return errors.length ? errors : true;
    }
    default:
      throw Error(`❌ Check "${check}" not supported. Please add support in checkmate package.`);
      break;
  }
}

function checkDirsFiles(challenge, subDir = null) {
  const errors = [];

  if (challenge.dirs && challenge.dirs.length) {
    console.log('** Directories');
    const dirChallenge = dirsCheck(challenge.dirs);
    if (dirChallenge.constructor === Array) {
      errors.push(...dirChallenge);
    }
  }
  if (challenge.files && challenge.files.length) {
    console.log('** Files');
    if (subDir) {
      challenge.files = challenge.files.map(file => `${subDir}/${file}`);
    }
    const fileChallenge = filesCheck(challenge.files);
    if (fileChallenge.constructor === Array) {
      errors.push(...fileChallenge);
    }
  }

  return errors.length ? errors : true;
}
