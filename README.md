![checkmate](https://raw.githubusercontent.com/TGPSKI/react-native-checkmate/master/assets/checkmate.png)

# package.json example

```
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
      "files": []
    },
    "ios": {
      "nodePath": true,
      "nodePathDir": "env",
      "nodePathFilename": "node_binary",
      "pods": false,
      "dirs": ["ios"],
      "files": []
    },
    "other": {
      "dirs": [],
      "files": []
    }
  },
  ```