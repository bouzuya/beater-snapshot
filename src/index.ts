import { deepStrictEqual } from "assert";
import fs from "fs";
import path from "path";
import { mkdirpSync } from "./fs";

type Snapshot = (name: string, o: any) => void;

type SnapshotOptions = {
  assert: (expected: string, actual: string) => void;
  directory: string;
  load: (p: string) => string;
  save: (p: string, data: string) => void;
  stringify: (o: any) => string;
  update: boolean;
};

type SnapshotKey = string;

type SnapshotValue = string;

const formatKey = (name: string): SnapshotKey =>
  name.replace(/[^-_a-zA-Z0-9\/]/g, "_") + ".json";

const defaultAssert = (expected: string, actual: string) =>
  deepStrictEqual(JSON.parse(expected), JSON.parse(actual));

const defaultLoad = (p: string): string =>
  fs.readFileSync(p, { encoding: "utf8" });

const defaultSave = (p: string, value: string): void => {
  const dir = path.dirname(p);
  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) mkdirpSync(dir, { recursive: true });
  fs.writeFileSync(p, value, { encoding: "utf8" });
};

const defaultStringify = (o: any): SnapshotValue => {
  if (o === void 0) throw new Error("actual is not supported value");
  return JSON.stringify(o, null, 2);
};

const ensureOptions = (options?: Partial<SnapshotOptions>): SnapshotOptions => {
  const assert = options?.assert ?? defaultAssert;
  const directory = options?.directory ?? "__snapshots__";
  const load = options?.load ?? defaultLoad;
  const save = options?.save ?? defaultSave;
  const stringify = options?.stringify ?? defaultStringify;
  const update = options?.update ?? process.env.UPDATE_SNAPSHOT === "true";
  return {
    assert,
    directory,
    load,
    save,
    stringify,
    update
  };
};

const init = (options?: Partial<SnapshotOptions>): Snapshot => {
  const { assert, directory, load, save, stringify, update } = ensureOptions(
    options
  );
  return (name: string, o: any): void => {
    const p = path.join(directory, formatKey(name));
    const actual = stringify(o);
    if (update) save(p, actual);
    const expected = load(p);
    assert(expected, actual);
  };
};

export { Snapshot, SnapshotOptions, init };

export default init;
