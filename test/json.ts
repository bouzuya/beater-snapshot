import { matchSnapshot, test } from './helpers';

const tests = [
  test('null', async (name) => {
    const x = null;
    matchSnapshot(name, x);
  }),
  test('boolean (true)', async (name) => {
    const x = true;
    matchSnapshot(name, x);
  }),
  test('boolean (false)', async (name) => {
    const x = false;
    matchSnapshot(name, x);
  }),
  test('number', async (name) => {
    const x = 1;
    matchSnapshot(name, x);
  }),
  test('string', async (name) => {
    const x = 'foo';
    matchSnapshot(name, x);
  }),
  test('array of null', async (name) => {
    const x = [null, null];
    matchSnapshot(name, x);
  }),
  test('array of number', async (name) => {
    const x = [1, 2];
    matchSnapshot(name, x);
  }),
  test('array of string', async (name) => {
    const x = ['foo', 'bar'];
    matchSnapshot(name, x);
  }),
  test('object', async (name) => {
    const x = { a: 'apple', b: 'banana' };
    matchSnapshot(name, x);
  })
];

export { tests };
