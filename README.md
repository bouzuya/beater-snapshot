# beater-snapshot

**This package is alpha version. You can use [Jest](https://jestjs.io/docs/en/snapshot-testing).**

A snapshot testing library for [beater][bouzuya/beater].

[bouzuya/beater]: https://github.com/bouzuya/beater

## Installation

```
$ npm install --save-dev beater-snapshot
```

## Usage

```javascript
// test.js
const { init } = require('beater-snapshot');

const matchSnapshot = init(); // options
const actual = { your: 'test target' };
matchSnapshot('snapshot file name', actual);

console.log('OK');
```

```
$ node test.js                          # Error: no snapshot
$ UPDATE_SNAPSHOT=true node test.js     # update snapshot
OK
$ ls __snapshots__/
snapshot_file_name.json                 # snapshot files
$ cat __snapshots__/snapshot_file_name.json
{
  "your": "test target"
}
$ node test.js                          # Success
OK
```

## Options

See: [`test/helpers.ts`](test/helpers.ts)

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travis-ci-badge-url]][travis-ci-url]

[npm-badge-url]: https://img.shields.io/npm/v/beater-snapshot
[npm-url]: https://www.npmjs.com/package/beater-snapshot
[travis-ci-badge-url]: https://img.shields.io/travis/bouzuya/beater-snapshot
[travis-ci-url]: https://travis-ci.org/bouzuya/beater-snapshot

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([https://bouzuya.net/][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: https://bouzuya.net/
