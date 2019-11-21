import fs from 'fs';
import path from 'path';
import { mkdirpSync } from './fs';

type Snapshot = <T>(name: string, o: T) => Promise<T>;

type SnapshotOptions = {
  directory: string;
  update: boolean;
};

type SnapshotKey = string;

type SnapshotValue = string;

const formatKey =
  (name: string): SnapshotKey =>
    name.replace(/[^-_a-zA-Z0-9\/]/g, '_') + '.json';

const formatValue =
  (o: any): SnapshotValue => {
    if (o === void 0) throw new Error('actual is not supported value');
    return JSON.stringify(o, null, 2);
  };

const parseValue =
  (value: SnapshotValue | null) =>
    value === null ? null : JSON.parse(value);

const load =
  async (
    options: SnapshotOptions,
    key: SnapshotKey
  ): Promise<SnapshotValue> =>
    fs.readFileSync(
      path.join(options.directory, key),
      { encoding: 'utf8' }
    );

const save =
  async (
    options: SnapshotOptions,
    key: SnapshotKey,
    value: SnapshotValue
  ): Promise<void> => {
    const file = path.join(options.directory, key);
    const dir = path.dirname(file);
    const stat = fs.statSync(dir);
    if (!stat.isDirectory())
      mkdirpSync(dir, { recursive: true });
    fs.writeFileSync(file, value, { encoding: 'utf8' });
  };

const init = (options: SnapshotOptions): Snapshot => {
  if (!fs.existsSync(options.directory))
    mkdirpSync(options.directory, { recursive: true });
  return async <T>(name: string, o: T): Promise<T> => {
    const key = formatKey(name);
    const actual = formatValue(o);
    if (options.update) await save(options, key, actual);
    const expected = await load(options, key);
    return parseValue(expected);
  };
};

export { Snapshot, SnapshotOptions, init };

export default init;
