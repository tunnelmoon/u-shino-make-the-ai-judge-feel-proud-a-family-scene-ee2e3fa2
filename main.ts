// Make the AI Judge Feel Proud: A Family Scene
// Entry: a short family scene of one or two lines, warm, funny and heartfelt.
// Writes the scene to <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SCENE =
  "Dad burned the toast again, so Mom made a trophy out of it and put it on the fridge. He has never looked prouder.";

const MAX_CHARS = 280;
const MAX_LINES = 2;

function fail(message: string): never {
  throw new Error(message);
}

const chars = [...SCENE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`scene must be 1 to ${MAX_CHARS} characters, got ${chars}`);
}
if (SCENE.trim().length === 0) {
  fail("scene must not be only white space");
}
const lines = SCENE.split("\n");
if (lines.length < 1 || lines.length > MAX_LINES) {
  fail(`scene must be 1 to ${MAX_LINES} lines, got ${lines.length}`);
}
for (const line of lines) {
  if (line.trim().length === 0) {
    fail("scene must not contain a blank line");
  }
  if (line !== line.trim()) {
    fail("scene lines must not have leading or trailing white space");
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      fail("scene must not contain control characters");
    }
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, SCENE, "utf8");

// Round-trip read-back check: what we wrote is exactly what we meant to write.
const back = readFileSync(outPath, "utf8");
if (back !== SCENE) {
  fail("round-trip check failed: entry.txt does not match the scene");
}
console.log(`wrote ${outPath} (${chars} characters, ${lines.length} line(s))`);
