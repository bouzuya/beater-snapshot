import assert from 'assert';
import { test as testOriginal } from 'beater';
import path from 'path';
import { Snapshot, init } from '../src'; // import ... from 'beater-snapshot';

const matchSnapshot: Snapshot = init({
  // you can use any assert function
  // parse -> compare -> assert
  assert: (expected: string, actual: string): void =>
    assert.deepStrictEqual(JSON.parse(expected), JSON.parse(actual)),

  directory: path.resolve('__snapshots__'),

  // test data to snapshot data converter
  stringify: (o: any): string =>
    JSON.stringify(o, null, 2),

  // update snapshot if update option is true
  update: process.env.UPDATE_SNAPSHOT === 'true'
});

// (option) custom beater test function
const test = (name: string, fn: (name: string) => Promise<void>) => {
  const test1 = testOriginal(name, () => fn(test1.meta.get('name') ?? ''));
  return test1;
};

export { matchSnapshot, test };
