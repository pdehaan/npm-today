# npm-today

## Why?

Get a list of recently updated npm modules so you can see what's "fresh".

## Installation:

This module isn't published to npm, so you'll need to install it directly from GitHub:

```sh
$ npm i pdehaan/npm-today -S
```

## Usage:

### API:

Currently there is only one method exposed:

- `getRecentlyUpdated(url)`:Promise &mdash; Takes an optional URL of a JSON file to fetch. If not specified, uses https://registry.npmjs.org/-/all/static/today.json.

## Example:

The following example will fetch the latest https://registry.npmjs.org/-/all/static/today.json file and validate the first 10 packages against [nodesecurity.io](https://nodesecurity.io/) via [**nsp**](http://npm.im/nsp):

```js
// $ npm i pdehaan/npm-today pdehaan/nsp-check-remote -S

const { checkLatest } = require('nsp-check-remote');
const { getRecentlyUpdated } = require('npm-today');

getRecentlyUpdated()
  .then((packages) => packages.slice(0, 10))
  .then((packages) => packages.map(({name}) => {
    return checkLatest(name, 'summary')
      .then(({data, err, output, package}) => {
        // Inject nsp response into package.json response.
        return Object.assign(package, {_nsp: {err, data, output}});
      });
  }))
  .then((promises) => Promise.all(promises))
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
```

### Sample output:

Here's a sample of some random output (with a few 'boring' package.json fields manually removed):

```js
[
  {
    "created": "2016-07-10T04:59:31.595Z",
    "dependencies": {
      "request": "^2.73.0"
    },
    "description": "中国原创音乐基地(5sing)NODE-SDK. It only supports for node environment. [5sing Mobile API Document](https://github.com/i5sing/5sing-mobile-api)",
    "devDependencies": {
      "babel-core": "^6.10.4",
      "babel-preset-es2015-rollup": "^1.1.1",
      "mocha": "^2.5.3",
      "rollup": "^0.33.0",
      "rollup-plugin-babel": "^2.6.1",
      "rollup-plugin-replace": "^1.1.1",
      "uglify-js": "^2.7.0"
    },
    "homepage": "https://github.com/i5sing/5sing-sdk#readme",
    "keywords": [
      "5singapi",
      "5singmobile",
      "5singsdk"
    ],
    "license": "MIT",
    "modified": "2016-09-02T05:30:49.940Z",
    "name": "5sing-sdk",
    "repository": "https://github.com/i5sing/5sing-sdk",
    "version": "0.0.9",
    "_nsp": {
      "err": null,
      "data": [],
      "output": "(+) No known vulnerabilities found"
    }
  },
  ...
]
```
