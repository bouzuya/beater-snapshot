import { test as testOriginal } from 'beater';
import path from 'path';
import { Snapshot, init } from '../src'; // import ... from 'beater-snapshot';

const assertMatchSnapshot: Snapshot = init({
  directory: path.resolve('./test/snapshots'),
  update: process.env.UPDATE_SNAPSHOT === 'true'
});

// (option) custom beater test function
const test = (name: string, fn: (name: string) => Promise<void>) => {
  const test1 = testOriginal(name, () => fn(test1.meta.get('name') ?? ''));
  return test1;
};

export { assertMatchSnapshot, test };
