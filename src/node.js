const shell = require('shelljs');

// Verify node_modules vs yarn lockfile
function yarnIntegrityCheck(cwd) {
  shell.cd(cwd);
  let out = shell.exec('yarn check --integrity').code;
  return out ? false : true;
}

// Check node path locations for packager
function nodePathCheck(platform, cwd, customPathIOS = null) {
  const ios = customPath => {
    if (customPath == null) {
      throw Error('iOS node path not defined.');
    }
    // NODE_BINARY variable is sourced in Xcode build phase
    if (shell.test('-f', customPath)) {
      return true;
    } else {
      return false;
    }
  };

  const android = () => {
    // Node path set in global gradle properties
    shell.cd('~/.gradle');
    let gradleProperties = shell.cat('gradle.properties').stdout;
    let splitPath = gradleProperties.split('NODE_BINARY=')[1].split('\n')[0];
    shell.cd(cwd);
    if (shell.test('-f', splitPath)) {
      return true;
    } else {
      return false;
    }
  };

  switch (platform) {
    case 'ios':
      return ios(customPath);
    case 'android':
      return android();
    case 'both':
      return ios(customPath) && android();
  }
}

module.exports = {
  yarnIntegrityCheck: yarnIntegrityCheck,
  nodePathCheck: nodePathCheck
};
