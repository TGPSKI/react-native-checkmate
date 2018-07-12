module.exports = {
  versionsCheck: versionsCheck
};

// Checks program versions for predefined version commands
function versionsCheck(versions) {
  /* Shell Commands
    OSX VERSION
     sw_vers | grep "ProductVersion" | awk '{print $2}'
    NODE
     node --version
    RUBY
     ruby --version | awk '{print $2}'
    XCODE
     xcodebuild -version | grep 'Xcode' | awk '{print $2}'
    YARN
     yarn --version
    NPM
     npm --version
  */

  function programSwitch(program) {
    switch (program) {
      case 'macOS':
        return shell
          .exec('sw_vers')
          .exec('grep ProductVersion')
          .stdout.replace('ProductVersion:\t', '')
          .replace('\n', '');
      case 'node':
        return shell.exec('node --version').stdout.replace('\n', '');
      case 'ruby':
        return shell.exec('ruby --version').split(' ')[1];
      case 'xcode':
        return shell
          .exec('xcodebuild -version')
          .exec('grep Xcode')
          .stdout.replace('Xcode ', '')
          .replace('\n', '');
      case 'yarn':
        return shell.exec('yarn --version').stdout.replace('\n', '');
      case 'npm':
        return shell.exec('npm --version').stdout.replace('\n', '');
      default:
        throw new Error('Version check command does not exist for all programs.');
    }
  }

  const programs = Object.keys(versions);
  const out = [];

  programs.forEach(program => {
    const actual = programSwitch(program);
    if (actual !== versions[program]) {
      out.push(`${program} version mismatch. Expected: ${versions[program]} | Actual: ${actual}`);
    }
  });
  return out.length ? out : true;
}
