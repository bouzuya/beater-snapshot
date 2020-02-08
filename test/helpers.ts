import assert from "assert";
import { Test, run } from "beater";
import { name, named as testOriginal } from "beater-helpers";
import path from "path";
import { Snapshot, init } from "../src"; // import ... from 'beater-snapshot';

const matchSnapshot: Snapshot = init({
  // you can use any assert function
  // parse -> compare -> assert
  assert: (expected: string, actual: string): void =>
    assert.deepStrictEqual(JSON.parse(expected), JSON.parse(actual)),

  directory: path.resolve("__snapshots__"),

  // test data to snapshot data converter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringify: (o: any): string => JSON.stringify(o, null, 2),

  // update snapshot if update option is true
  update: process.env.UPDATE_SNAPSHOT === "true"
});

// (option) custom beater test function
const test = (testName: string, fn: (name: string) => Promise<void>): Test => {
  const test1 = testOriginal(testName, () => fn(name(test1) ?? ""));
  return test1;
};

export { Test, matchSnapshot, run, test };
