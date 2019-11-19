import fs, { Stats } from 'fs';
import { dirname } from 'path';

// TODO: fs.promises.mkdir
const promisedMkdir =
  async (path: string, _options: { recursive: true; }): Promise<void> => {
    try {
      await promisedMkdirImpl(path);
    } catch (_) {
      const stat = await promisedStat(path);
      if (stat.isDirectory()) return;
      const dir = dirname(path);
      if (dir === path) throw new Error('/');
      await promisedMkdir(dir, { recursive: true });
      await promisedMkdirImpl(path);
    }
  };

const promisedMkdirImpl =
  (path: string): Promise<void> =>
    new Promise((resolve, reject) =>
      fs.mkdir(path, (err) => err === null ? resolve() : reject(err))
    );

// TODO: fs.promises.readFile
const promisedReadFile = (
  path: string,
  options: { encoding: 'utf8' }
): Promise<string> =>
  new Promise((resolve, reject) =>
    fs.readFile(path, options, (err, data) =>
      err === null ? resolve(data) : reject(err)
    )
  );

// TODO: fs.promises.writeFile
const promisedWriteFile = (
  path: string,
  data: string,
  options: { encoding: 'utf8' }
): Promise<void> =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, options, (err) =>
      err === null ? resolve() : reject(err)
    )
  );

// TODO: fs.promises.stat
const promisedStat =
  (path: string): Promise<Stats> =>
    new Promise((resolve, reject) =>
      fs.stat(path, (err, stats) =>
        err === null ? resolve(stats) : reject(err)
      )
    );

export { promisedMkdir, promisedReadFile, promisedStat, promisedWriteFile };
