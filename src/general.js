module.exports = {
  dirCheck: dirCheck,
  dirsCheck: dirsCheck,
  fileCheck: fileCheck,
  filesCheck: filesCheck,
  programCheck: programCheck,
  programsCheck: programsCheck
};

// Check individual directory for presence
function dirCheck(dir) {
  if (!shell.test('-d', dir)) {
    return false;
  } else {
    return true;
  }
}

// Check array of directories for presence
function dirsCheck(dirs) {
  const dirErrors = [];
  dirs.forEach(dir => {
    if (!dirCheck(dir)) {
      dirErrors.push(`${dir} not found`);
    }
  });

  return dirErrors.length ? dirErrors : true;
}

// Check individual file for presence
function fileCheck(file) {
  if (!shell.test('-f', file)) {
    return false;
  } else {
    return true;
  }
}

// Check array of files for presence
function filesCheck(files) {
  const fileErrors = [];
  files.forEach(file => {
    if (!shell.test('-f', file)) {
      fileErrors.push(`${file} not found`);
    }
  });

  return fileErrors.length ? fileErrors : true;
}

// Check individual program for presence
function programCheck(program) {
  if (!shell.which(program)) {
    return false;
  } else {
    return true;
  }
}

// Check array of programs for presence
function programsCheck(programs) {
  const programErrors = [];
  programs.forEach(program => {
    if (!programCheck(program)) {
      programErrors.push(`${program} not found`);
    }
  });
  return programErrors.length ? programErrors : true;
}
