import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "I bought my cat a ninety-dollar bed; she sleeps in the box and pays me back in knocked-over glasses.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Gate validation: the entry must be a single line of 1-200 characters.
const chars = [...entry].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
}
if (entry.includes("\n") || entry.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

// Read-back verification: the written file must match the entry byte for byte.
const back = readFileSync(outPath, "utf8");
if (back !== entry) {
  throw new Error("read-back mismatch: entry.txt does not match the entry text");
}
