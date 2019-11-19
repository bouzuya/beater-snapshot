import { Test, run } from 'beater';
import { tests as jsonTests } from './json';

const tests: Test[] = [
  ...jsonTests
];

run(tests).catch((e) => {
  console.error(e);
  process.exit(1);
});
