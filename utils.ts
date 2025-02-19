import fs from "node:fs";

export function readFileIfExists(path: string, encoding: BufferEncoding = "utf8"): string | null {
  return fs.existsSync(path) ? fs.readFileSync(path, encoding) : null;
}
