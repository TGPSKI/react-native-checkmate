![checkmate-logo](assets/checkmate-logo.png)

# Checkmate for React Native

Checkmate is a environment validation tool for React Native projects. Increase your build success rate among multiple collaborators and CI servers. Catch build configuration errors at the start of the build, instead of 95% through.

* Run checkmate as a standalone command. `checkmate` in your React Native project root directory.

![checkmate-success](assets/checkmate-success.png)

* Run checkmate as part of your Fastfile. Use the yarn or npm plugins as follows:

```
  yarn(
    command: 'install',
    package_path: './package.json'
  )
  yarn(
    command: 'checkmate',
    package_path: './package.json'
  )
```

# Install

`yarn -D add react-native-checkmate`

# Configure

Add a `checkmate` key and configuration object to your `package.json` file.

# package.json configuration example

```json
{
  ...,
  "checkmate": {
    "verbose": false,
    "shellPath": "/bin/zsh",
    "silentShell": true,
    "programs": ["fastlane", "gem", "pod", "react-native", "badge"],
    "versions": {
      "macOS": "10.12.6",
      "node": "v8.11.3",
      "ruby": "2.3.1p112",
      "xcode": "9.2",
      "yarn": "1.7.0",
      "npm": "5.6.0"
    },
    "envVars": ["ANDROID_SDK", "ANDROID_SDK_TOOLS", "ANDROID_PLATFORM_TOOLS"],
    "env": {
      "dir": "env",
      "buildTypes": ["dev", "staging", "release"]
    },
    "node": {
      "yarnIntegrity": true,
      "dirs": ["node_modules"],
      "files": ["yarn.lock"]
    },
    "android": {
      "nodePath": true,
      "gradle": true,
      "dirs": ["android"],
      "files": ["android/my-release-key.keystore"]
    },
    "ios": {
      "nodePath": true,
      "nodePathDir": "env",
      "nodePathFilename": "node_binary",
      "pods": true,
      "dirs": ["ios"],
      "files": []
    },
    "other": {
      "dirs": [],
      "files": []
    }
  },
  ...
}
```

# Error example

package.json configuration:

```json
{
  "checkmate": {
    "verbose": false,
    "shellPath": "/bin/zsh",
    "silentShell": true,
    "programs": ["fastlane", "gem", "pod", "react-native", "badge", "missing-program"],
    "versions": {
      "macOS": "0.13.6",
      "node": "v8.11.3",
      "ruby": "2.3.1p112",
      "xcode": "0.4.1",
      "yarn": "1.7.0",
      "npm": "6.1.0"
    },
    "envVars": ["ANDROID_SDK", "ANDROID_SDK_TOOLS", "ANDROID_PLATFORM_TOOLS", "MISSING_ENV_VAR"],
    "env": {
      "dir": "env",
      "buildTypes": ["dev", "staging", "release", "missing_build_type"]
    },
    "node": {
      "yarnIntegrity": true,
      "dirs": ["node_modules"],
      "files": ["yarn.lock"]
    },
    "android": {
      "nodePath": true,
      "gradle": true,
      "dirs": ["android", "missing_dir_android"],
      "files": ["android/missing_android.file"]
    },
    "ios": {
      "nodePath": true,
      "nodePathDir": "env",
      "nodePathFilename": "node_binary",
      "pods": false,
      "dirs": ["ios", "missing_dir_ios"],
      "files": ["ios/missing_ios.file"]
    }
  }
}
```

Error output:

![failed-checkmate](assets/checkmate-failure.png)



# Options Reference

## Configuration

### verbose (boolean)

console.log checkmate configuration object + all shell output

### shellPath (string)

checkmate expects a bash or similar shell (bash, zsh, etc.). shelljs by default uses /bin/sh. String path to bash or zsh executable.

### silentShell (boolean)

show / hide shell output

## Challenges

### programs (string array)

executable program names as strings

### versions (object)

Supported software:

* macOS
* node
* ruby
* xcode
* yarn
* npm

### envVars (string array)

### env

Validates environment files stored in $PROJECT_ROOT/$dir/[buildTypes]

#### dir (string)

#### buildTypes (string array)

### node

#### yarnIntegrity

#### dirs

#### files

### android

#### nodePath

#### gradle

#### dirs

#### files

### ios

#### nodePath

#### nodePathDir

#### nodePathFilename

### other



