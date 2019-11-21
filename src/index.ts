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
  async (p: string): Promise<SnapshotValue> =>
    fs.readFileSync(p, { encoding: 'utf8' });

const save =
  async (
    p: string,
    value: SnapshotValue
  ): Promise<void> => {
    const dir = path.dirname(p);
    const stat = fs.statSync(dir);
    if (!stat.isDirectory())
      mkdirpSync(dir, { recursive: true });
    fs.writeFileSync(p, value, { encoding: 'utf8' });
  };

const ensureOptions = (options?: Partial<SnapshotOptions>): SnapshotOptions => {
  const directory = options?.directory ?? '__snapshots__';
  const update = options?.update ?? process.env.UPDATE_SNAPSHOT === 'true';
  return {
    directory,
    update
  };
};

const init = (options?: Partial<SnapshotOptions>): Snapshot => {
  const { directory, update } = ensureOptions(options);
  if (!fs.existsSync(directory))
    mkdirpSync(directory, { recursive: true });
  return async <T>(name: string, o: T): Promise<T> => {
    const p = path.join(directory, formatKey(name));
    const actual = formatValue(o);
    if (update) await save(p, actual);
    const expected = await load(p);
    return parseValue(expected);
  };
};

export { Snapshot, SnapshotOptions, init };

export default init;
