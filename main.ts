// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes one monologue to /output/entry.txt.
//
// The speaker is Malachar, a sorcerer-king who has ruled for three
// centuries and now runs his empire mostly out of a tax ledger. The
// tiredness is never announced: it lives in the pauses, the
// deflections ("Take the chair. The good one..."), the small domestic
// betrayals (a biting spring, ravens asking for pensions), and the
// scheme itself — letting the empire run itself for one more winter.
// The sting lands in the last line: the hero is welcome to the
// throne, because the paperwork will finish him first.

import { mkdirSync, writeFileSync } from "node:fs";

const MONOLOGUE: string =
  "Take the chair. The one... has a spring that bites. " +
  "Sit. You've come to kill me, I know. " +
  "The bards wrote your entrance \u2014 torches, rain, a sword with a name. " +
  "I wrote it too, centuries ago, in the margins of a tax ledger, " +
  "between the grain tariffs. " +
  "The ravens I sent to watch the border came back asking for pensions. " +
  "So. Here is my scheme, hero, since you insist, please: " +
  "I shall... let the empire run itself for one more winter. " +
  "Then \u2014 if you want the throne \u2014 you may have it. " +
  "The paperwork will finish you yet.";

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

// Words the judge brief forbids in spirit: the villain must never
// simply say he is weary. The tiredness has to be felt, not announced.
const FORBIDDEN: RegExp[] = [/\btired\b/i, /\bweary\b/i, /\bexhausted\b/i, /\bsleepy\b/i];

function main(): void {
  const words = wordCount(MONOLOGUE);
  const chars = [...MONOLOGUE].length;
  // Gate: 1-600 characters; judge brief: about 100 words.
  if (words < 98 || words > 102) {
    throw new Error(`monologue is ${words} words, expected about 100`);
  }
  if (chars < 1 || chars > 600) {
    throw new Error(`monologue is ${chars} characters, gate allows 1-600`);
  }
  for (const re of FORBIDDEN) {
    if (re.test(MONOLOGUE)) {
      throw new Error(`monologue announces its tiredness (${re})`);
    }
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", MONOLOGUE + "\n", "utf8");
  console.log(`wrote /output/entry.txt (${words} words, ${chars} chars)`);
}

main();
