# console-log-saver
Simple mechanism for collecting and saving to file logs from the browser.

With that library you will collecting all logs of the browser like debug, error, info, log, warn. And next you can take them to file and save on your disc.

[![npm version](https://badge.fury.io/js/console-log-saver.svg)](https://badge.fury.io/js/console-log-saver) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Installation
```sh
$ npm install console-log-saver
```

# Quick start
Put it in entry point of your app.
```sh
import 'console-log-saver';
```
Take all logs to file.
```sh
console.saver.save('my-app-logs');
```

# Licence
MIT