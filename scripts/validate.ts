import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ProposalsSchema } from "../src/schemas/proposals.js";
import { TracksSchema } from "../src/schemas/tracks.js";
import { TimetableSchema } from "../src/schemas/timetable.js";
import { SponsorsSchema } from "../src/schemas/sponsors.js";
import { StaffSchema } from "../src/schemas/staff.js";
import { NewsSchema } from "../src/schemas/news.js";

const slug = process.argv[2] || "kinoko-2025";
const sampleDir = resolve(import.meta.dirname, `../sample/${slug}`);

console.log(`Validating: ${slug}`);
console.log(`Directory: ${sampleDir}`);
console.log();

interface ValidationTarget {
  file: string;
  schema: { parse: (data: unknown) => unknown };
  label: string;
}

const targets: ValidationTarget[] = [
  { file: "proposals.json", schema: ProposalsSchema, label: "proposals" },
  { file: "proposals_accepted.json", schema: ProposalsSchema, label: "proposals_accepted" },
  { file: "tracks.json", schema: TracksSchema, label: "tracks" },
  { file: "timetable.json", schema: TimetableSchema, label: "timetable" },
  { file: "sponsors.json", schema: SponsorsSchema, label: "sponsors" },
  { file: "staff_structured.json", schema: StaffSchema, label: "staff (structured)" },
  { file: "news.json", schema: NewsSchema, label: "news" },
];

let hasError = false;

for (const { file, schema, label } of targets) {
  const filePath = resolve(sampleDir, file);
  try {
    const raw = readFileSync(filePath, "utf-8").trim();
    if (!raw) {
      console.log(`  [SKIP] ${label} (${file}) - empty file`);
      continue;
    }
    const json = JSON.parse(raw);
    schema.parse(json);
    console.log(`  [PASS] ${label} (${file})`);
  } catch (error) {
    hasError = true;
    console.error(`  [FAIL] ${label} (${file})`);
    if (error instanceof Error) {
      console.error(`         ${error.message.slice(0, 500)}`);
    }
  }
}

console.log();
if (hasError) {
  console.error("Some validations failed.");
  process.exit(1);
} else {
  console.log("All validations passed!");
}
