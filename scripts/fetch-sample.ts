import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const slug = process.argv[2];
const cookie = process.env.FORTEE_COOKIE;

if (!slug) {
  console.error("Usage: FORTEE_COOKIE='...' tsx scripts/fetch-sample.ts <event-slug>");
  console.error("Example: FORTEE_COOKIE='_session=abc123' tsx scripts/fetch-sample.ts kinoko-2026");
  console.error();
  console.error("Cookie の取得方法:");
  console.error("  1. Chrome で fortee.jp にログイン");
  console.error("  2. DevTools を開く (F12)");
  console.error("  3. Network タブで任意の API リクエストを選択");
  console.error("  4. Request Headers の Cookie の値をコピー");
  process.exit(1);
}

if (!cookie) {
  console.error("Error: FORTEE_COOKIE 環境変数を設定してください");
  console.error("Example: FORTEE_COOKIE='_session=abc123' tsx scripts/fetch-sample.ts kinoko-2026");
  process.exit(1);
}

const baseUrl = `https://fortee.jp/${slug}/api`;

interface FetchTarget {
  endpoint: string;
  file: string;
  label: string;
}

const targets: FetchTarget[] = [
  { endpoint: "staff?type=simple", file: "staff.json", label: "スタッフ(シンプル)" },
  { endpoint: "staff?type=structured", file: "staff_structured.json", label: "スタッフ(構造化)" },
  { endpoint: "staff/v1", file: "staff_v1.json", label: "スタッフ V1" },
  { endpoint: "sponsors", file: "sponsors.json", label: "スポンサー" },
  { endpoint: "proposals", file: "proposals.json", label: "プロポーザル" },
  { endpoint: "proposals/accepted", file: "proposals_accepted.json", label: "プロポーザル(採択のみ)" },
  { endpoint: "timetable", file: "timetable.json", label: "タイムテーブル" },
  { endpoint: "tracks", file: "tracks.json", label: "トラック" },
  { endpoint: "news", file: "news.json", label: "お知らせ" },
];

const outDir = resolve(import.meta.dirname, `../sample/${slug}`);
mkdirSync(outDir, { recursive: true });

console.log(`Fetching data for: ${slug}`);
console.log(`Output directory: ${outDir}`);
console.log();

let hasError = false;

for (const { endpoint, file, label } of targets) {
  const url = `${baseUrl}/${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: { Cookie: cookie },
    });

    if (!res.ok) {
      hasError = true;
      console.error(`  [FAIL] ${label} (${file}) - HTTP ${res.status}`);
      continue;
    }

    const text = await res.text();
    const outPath = resolve(outDir, file);
    writeFileSync(outPath, text, "utf-8");
    console.log(`  [OK]   ${label} → ${file} (${text.length} bytes)`);
  } catch (error) {
    hasError = true;
    console.error(`  [FAIL] ${label} (${file})`);
    if (error instanceof Error) {
      console.error(`         ${error.message}`);
    }
  }
}

console.log();
if (hasError) {
  console.error("Some fetches failed.");
  process.exit(1);
} else {
  console.log("All data fetched successfully!");
}
