import fs from 'fs';
import path from 'path';
import { mkdirpSync } from './fs';

type Snapshot = <T>(name: string, o: T) => Promise<T>;

type SnapshotOptions = {
  directory: string;
  load: (p: string) => string;
  save: (p: string, data: string) => void;
  stringify: (o: any) => string;
  update: boolean;
};

type SnapshotKey = string;

type SnapshotValue = string;

const formatKey =
  (name: string): SnapshotKey =>
    name.replace(/[^-_a-zA-Z0-9\/]/g, '_') + '.json';

const defaultStringify =
  (o: any): SnapshotValue => {
    if (o === void 0) throw new Error('actual is not supported value');
    return JSON.stringify(o, null, 2);
  };

const defaultParse =
  (value: SnapshotValue | null) =>
    value === null ? null : JSON.parse(value);

const defaultLoad =
  (p: string): string =>
    fs.readFileSync(p, { encoding: 'utf8' });

const defaultSave =
  (p: string, value: string): void => {
    const dir = path.dirname(p);
    const stat = fs.statSync(dir);
    if (!stat.isDirectory())
      mkdirpSync(dir, { recursive: true });
    fs.writeFileSync(p, value, { encoding: 'utf8' });
  };

const ensureOptions = (options?: Partial<SnapshotOptions>): SnapshotOptions => {
  const directory = options?.directory ?? '__snapshots__';
  const load = options?.load ?? defaultLoad;
  const save = options?.save ?? defaultSave;
  const stringify = options?.stringify ?? defaultStringify;
  const update = options?.update ?? process.env.UPDATE_SNAPSHOT === 'true';
  return {
    directory,
    load,
    save,
    stringify,
    update
  };
};

const init = (options?: Partial<SnapshotOptions>): Snapshot => {
  const {
    directory,
    load,
    save,
    stringify,
    update
  } = ensureOptions(options);
  return async <T>(name: string, o: T): Promise<T> => {
    const p = path.join(directory, formatKey(name));
    const actual = stringify(o);
    if (update) save(p, actual);
    const expected = load(p);
    return defaultParse(expected);
  };
};

export { Snapshot, SnapshotOptions, init };

export default init;
