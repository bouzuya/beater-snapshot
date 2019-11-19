# beater-snapshot

A snapshot testing library for [beater][bouzuya/beater].

[bouzuya/beater]: https://github.com/bouzuya/beater

## Installation

```
$ npm install -D beater-snapshot
```

## Usage

```javascript
// test.js
const assert = require('assert');
const path = require('path');
const { init } = require('beater-snapshot');

const snapshot = init({
  directory: path.resolve('./snapshots'),
  // update snapshot if update option is true
  // you can use any variable name
  update: process.env.UPDATE_SNAPSHOT === 'true'
});

const main = async () => {
  const actual = { your: 'test target' };
  const expected = await snapshot('snapshot file name', actual);
  assert.deepStrictEqual(actual, expected);
};

main().then(() => {
  console.log('OK');
});
```

```
$ node test.js                          # Error: no snapshot
$ UPDATE_SNAPSHOT=true node test.js     # update snapshot
OK
$ ls snapshots/
snapshot_file_name.json                 # snapshot files
$ cat snapshots/snapshot_file_name.json
{
  "your": "test target"
}
$ node test.js                          # Success
OK
```

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
