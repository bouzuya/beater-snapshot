import assert from 'assert';
import { snapshot, test, assertMatchSnapshot } from './helpers';

const tests = [
  test('null', async (name) => {
    const x = null;
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('boolean (true)', async (name) => {
    const x = true;
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('boolean (false)', async (name) => {
    const x = false;
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('number', async (name) => {
    const x = 1;
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('string', async (name) => {
    const x = 'foo';
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('array of null', async (name) => {
    const x = [null, null];
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('array of number', async (name) => {
    const x = [1, 2];
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('array of string', async (name) => {
    const x = ['foo', 'bar'];
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),
  test('object', async (name) => {
    const x = { a: 'apple', b: 'banana' };
    assert.deepStrictEqual(x, await snapshot(name, x));
  }),

  test('custom assert function', async (name) => {
    const x = { a: 123, z: 'xyz' };
    assertMatchSnapshot(name, x);
  })
];

export { tests };
