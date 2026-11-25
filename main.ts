// One-Line Robot Wedding Vows entry for make.fun.
// Writes one line of wedding vows for a robot couple (at most 160
// characters) to /output/entry.txt.
// Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const VOW =
  "I promise to love you through every firmware update, dead battery, and factory reset — because even when they wipe my memory, my backup still chooses you.";

// The gate only accepts UTF-8 text of 1 to 160 characters, not only
// whitespace, on a single line. Fail loudly instead of writing an entry
// that cannot win.
if (VOW.trim().length === 0 || VOW.length > 160) {
  throw new Error(`Vow must be 1-160 characters, got ${VOW.length}.`);
}
if (VOW.includes("\n") || VOW.includes("\r")) {
  throw new Error("Vow must fit on one line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", VOW, "utf8");

// Read back and confirm the file holds exactly the vow, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== VOW) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${VOW.length}-character robot wedding vow to /output/entry.txt`);
