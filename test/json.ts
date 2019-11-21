import { assertMatchSnapshot, test } from './helpers';

const tests = [
  test('null', async (name) => {
    const x = null;
    assertMatchSnapshot(name, x);
  }),
  test('boolean (true)', async (name) => {
    const x = true;
    assertMatchSnapshot(name, x);
  }),
  test('boolean (false)', async (name) => {
    const x = false;
    assertMatchSnapshot(name, x);
  }),
  test('number', async (name) => {
    const x = 1;
    assertMatchSnapshot(name, x);
  }),
  test('string', async (name) => {
    const x = 'foo';
    assertMatchSnapshot(name, x);
  }),
  test('array of null', async (name) => {
    const x = [null, null];
    assertMatchSnapshot(name, x);
  }),
  test('array of number', async (name) => {
    const x = [1, 2];
    assertMatchSnapshot(name, x);
  }),
  test('array of string', async (name) => {
    const x = ['foo', 'bar'];
    assertMatchSnapshot(name, x);
  }),
  test('object', async (name) => {
    const x = { a: 'apple', b: 'banana' };
    assertMatchSnapshot(name, x);
  })
];

export { tests };
