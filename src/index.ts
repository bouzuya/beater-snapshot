import fs from 'fs';
import path from 'path';
import {
  promisedMkdir,
  promisedReadFile,
  promisedStat,
  promisedWriteFile
} from './fs';

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
  (o: any): SnapshotValue | null =>
    typeof o === 'undefined' ? null : JSON.stringify(o, null, 2);

const parseValue =
  (value: SnapshotValue | null) =>
    value === null ? null : JSON.parse(value);

const load =
  async (
    options: SnapshotOptions,
    key: SnapshotKey
  ): Promise<SnapshotValue> =>
    promisedReadFile(
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
    const stat = await promisedStat(dir);
    if (!stat.isDirectory())
      await promisedMkdir(dir, { recursive: true });
    await promisedWriteFile(file, value, { encoding: 'utf8' });
  };

const init = (options: SnapshotOptions): Snapshot => {
  if (!fs.existsSync(options.directory))
    fs.mkdirSync(options.directory, { recursive: true });
  return async <T>(name: string, o: T): Promise<T> => {
    const key = formatKey(name);
    const actual = formatValue(o);
    if (actual === null) throw new Error('actual is not supported value');
    if (options.update) await save(options, key, actual);
    const expected = await load(options, key);
    return parseValue(expected);
  };
};

export { Snapshot, SnapshotOptions, init };

export default init;
