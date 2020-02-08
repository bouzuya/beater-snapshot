import fs from "fs";
import { dirname } from "path";

// TODO: fs.mkdirSync
const mkdirpSync = (path: string, _options: { recursive: true }): void => {
  try {
    fs.mkdirSync(path);
  } catch (_) {
    const stat = fs.statSync(path);
    if (stat.isDirectory()) return;
    const dir = dirname(path);
    if (dir === path) throw new Error("/");
    mkdirpSync(dir, { recursive: true });
    fs.mkdirSync(path);
  }
};

export { mkdirpSync };
