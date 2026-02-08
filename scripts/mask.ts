import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { faker } from "@faker-js/faker/locale/ja";
import { ProposalsSchema } from "../src/schemas/proposals.js";
import { TracksSchema } from "../src/schemas/tracks.js";
import { TimetableSchema } from "../src/schemas/timetable.js";
import { SponsorsSchema } from "../src/schemas/sponsors.js";
import { StaffSchema } from "../src/schemas/staff.js";
import { NewsSchema } from "../src/schemas/news.js";

const GLOBAL_SEED = 42;

const slug = process.argv[2] || "kinoko-2025";
const sampleDir = resolve(import.meta.dirname, `../sample/${slug}`);
const outDir = resolve(import.meta.dirname, "../sample/masked");

// --- ユーティリティ ---

function uuidToSeed(uuid: string): number {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash = ((hash << 5) - hash + uuid.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// カタカナ名（speaker.kana 用）
const KATAKANA_SURNAMES = [
  "タナカ", "サトウ", "スズキ", "タカハシ", "イトウ",
  "ワタナベ", "ヤマモト", "ナカムラ", "コバヤシ", "カトウ",
  "ヨシダ", "ヤマダ", "ササキ", "マツモト", "イノウエ",
  "キムラ", "ハヤシ", "シミズ", "ヤマグチ", "アベ",
];
const KATAKANA_GIVEN_NAMES = [
  "タロウ", "ハナコ", "ケンジ", "サクラ", "ユウキ",
  "アヤ", "ショウタ", "ミサキ", "リョウ", "カオリ",
  "ダイスケ", "エミ", "ナオキ", "マイ", "コウヘイ",
  "ユカ", "シンジ", "アカネ", "ヒロシ", "モモカ",
];

function generateKatakanaName(seed: number): string {
  const si = seed % KATAKANA_SURNAMES.length;
  const gi = Math.floor(seed / KATAKANA_SURNAMES.length) % KATAKANA_GIVEN_NAMES.length;
  return `${KATAKANA_SURNAMES[si]} ${KATAKANA_GIVEN_NAMES[gi]}`;
}

// ひらがな社名（sponsor.kana 用）
const HIRAGANA_COMPANY = [
  "さくらてっく", "やまとしすてむず", "あおぞらそふと",
  "みらいでざいん", "はなびらぼ", "つきかぜねっと",
  "ほしぞらでーた", "もりのくらうど", "うみかぜあい",
  "ひかりえんじにありんぐ", "かぜのたに", "そらいろわーくす",
  "ゆめみらい", "にじいろてくのろじー", "あかつきらぼ",
];

function generateHiraganaCompanyKana(seed: number): string {
  const idx = seed % HIRAGANA_COMPANY.length;
  return HIRAGANA_COMPANY[idx] + "かぶしきがいしゃ";
}

function sanitizeUsername(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 15) || "user";
}

// --- マスキング関数 ---

function maskSpeaker(speaker: any, entityUuid: string): any {
  const seed = uuidToSeed(entityUuid) + GLOBAL_SEED;
  faker.seed(seed);

  const result: any = {
    name: faker.person.fullName(),
    kana: generateKatakanaName(seed),
  };
  if (speaker.twitter !== undefined) {
    result.twitter = sanitizeUsername(faker.internet.username());
  }
  if (speaker.avatar_url !== undefined) {
    result.avatar_url = `https://i.pravatar.cc/200?u=${seed}`;
  }
  return result;
}

function generateDummyTitle(seed: number): string {
  faker.seed(seed);
  const prefixes = [
    "エンジニアとしての", "変化する時代の", "チームで考える",
    "現場で学んだ", "失敗から得た", "10年後を見据えた",
    "今こそ振り返る", "明日から使える", "キャリアを支える",
    "技術と向き合う",
  ];
  const topics = [
    "キャリア戦略", "成長の軌跡", "生存戦略", "学びの共有",
    "働き方の選択", "スキルの磨き方", "組織との関わり方",
    "挑戦と変容", "技術的負債との戦い", "チームビルディング",
  ];
  const suffixes = [
    "について", "を語る", "〜私の場合〜", "のすすめ",
    "と向き合う", "を考える", "の実践", "",
  ];
  const p = prefixes[seed % prefixes.length];
  const t = topics[Math.floor(seed / prefixes.length) % topics.length];
  const s = suffixes[Math.floor(seed / (prefixes.length * topics.length)) % suffixes.length];
  return `${p}${t}${s}`;
}

function maskProposal(proposal: any): any {
  const seed = uuidToSeed(proposal.uuid) + GLOBAL_SEED;
  const result: any = {
    uuid: proposal.uuid,
    url: `https://fortee.jp/dummy-event/proposal/${proposal.uuid}`,
    title: generateDummyTitle(seed),
    abstract: proposal.abstract,
    accepted: proposal.accepted,
    speaker: maskSpeaker(proposal.speaker, proposal.uuid),
    created: proposal.created,
  };
  if (proposal.timetable !== undefined) {
    result.timetable = proposal.timetable;
  }
  result.feedback = proposal.feedback;
  if (proposal.slide_url !== undefined) {
    result.slide_url = `https://example.com/slides/${uuidToSeed(proposal.uuid)}`;
  }
  if (proposal.blog_url !== undefined) {
    result.blog_url = `https://example.com/blog/${uuidToSeed(proposal.uuid)}`;
  }
  return result;
}

function maskTimetableEntry(entry: any): any {
  if (entry.type === "timeslot") {
    return entry;
  }

  const seed = uuidToSeed(entry.uuid) + GLOBAL_SEED;

  const result: any = {
    type: entry.type,
    uuid: entry.uuid,
    url: `https://fortee.jp/dummy-event/proposal/${entry.uuid}`,
    title: generateDummyTitle(seed),
    abstract: faker.lorem.paragraphs(3, "\r\n\r\n"),
    accepted: entry.accepted,
    track: entry.track,
    starts_at: entry.starts_at,
    length_min: entry.length_min,
    tags: entry.tags,
    speaker: maskSpeaker(entry.speaker, entry.uuid),
    fav: entry.fav,
    fav_count: entry.fav_count,
    feedback: entry.feedback,
  };
  if (entry.slide_url !== undefined) {
    result.slide_url = `https://example.com/slides/${seed}`;
  }
  if (entry.blog_url !== undefined) {
    result.blog_url = `https://example.com/blog/${seed}`;
  }
  return result;
}

function maskSponsor(sponsor: any): any {
  const seed = uuidToSeed(sponsor.id) + GLOBAL_SEED;
  faker.seed(seed);

  const fakeName = faker.company.name();
  const fakeSlug = sanitizeUsername(faker.internet.username());

  const result: any = {
    id: sponsor.id,
    name: fakeName,
    kana: generateHiraganaCompanyKana(seed),
    url: `https://example.com/${fakeSlug}`,
    pr: `${fakeName}は、${faker.company.catchPhrase()}を推進する企業です。\r\n\r\n${faker.lorem.paragraph()}`,
  };
  if (sponsor.twitter !== undefined) {
    result.twitter = sanitizeUsername(faker.internet.username());
  }
  if (sponsor.avatar !== undefined) {
    result.avatar = `https://placehold.co/200x200/EEE/31343C?text=${encodeURIComponent(fakeName.charAt(0))}`;
  }
  return result;
}

function maskStaffMember(member: any): any {
  const seed = uuidToSeed(member.id) + GLOBAL_SEED;
  faker.seed(seed);

  const result: any = {
    id: member.id,
    name: faker.person.fullName(),
  };
  if (member.url !== undefined) {
    const username = sanitizeUsername(faker.internet.username());
    result.url = `https://twitter.com/${username}`;
  }
  if (member.avatar_url !== undefined) {
    result.avatar_url = `https://i.pravatar.cc/200?u=${seed}`;
  }
  return result;
}

// --- ターゲット定義 ---

interface MaskTarget {
  file: string;
  label: string;
  schema: { parse: (data: unknown) => unknown };
  mask: (data: any) => any;
}

const targets: MaskTarget[] = [
  {
    file: "proposals.json",
    label: "proposals",
    schema: ProposalsSchema,
    mask: (data) => ({
      proposals: data.proposals.map(maskProposal),
    }),
  },
  {
    file: "proposals_accepted.json",
    label: "proposals_accepted",
    schema: ProposalsSchema,
    mask: (data) => ({
      proposals: data.proposals.map(maskProposal),
    }),
  },
  {
    file: "tracks.json",
    label: "tracks",
    schema: TracksSchema,
    mask: (data) => data,
  },
  {
    file: "timetable.json",
    label: "timetable",
    schema: TimetableSchema,
    mask: (data) => ({
      timetable: data.timetable.map(maskTimetableEntry),
    }),
  },
  {
    file: "sponsors.json",
    label: "sponsors",
    schema: SponsorsSchema,
    mask: (data) => ({
      sponsor_plans: data.sponsor_plans.map((plan: any) => ({
        ...plan,
        sponsors: plan.sponsors.map(maskSponsor),
      })),
    }),
  },
  {
    file: "staff_structured.json",
    label: "staff (structured)",
    schema: StaffSchema,
    mask: (data) => ({
      staff_types: data.staff_types.map((type: any) => ({
        ...type,
        staff: type.staff.map(maskStaffMember),
      })),
    }),
  },
  {
    file: "news.json",
    label: "news",
    schema: NewsSchema,
    mask: (data) => data,
  },
];

// --- メイン処理 ---

mkdirSync(outDir, { recursive: true });

console.log(`Masking: ${slug}`);
console.log(`Source: ${sampleDir}`);
console.log(`Output: ${outDir}`);
console.log();

let hasError = false;

for (const { file, label, schema, mask } of targets) {
  const filePath = resolve(sampleDir, file);
  try {
    const raw = readFileSync(filePath, "utf-8").trim();
    if (!raw) {
      console.log(`  [SKIP] ${label} (${file}) - empty file`);
      writeFileSync(resolve(outDir, file), "", "utf-8");
      continue;
    }
    const json = JSON.parse(raw);
    const masked = mask(json);

    // バリデーション
    schema.parse(masked);

    writeFileSync(resolve(outDir, file), JSON.stringify(masked, null, 2) + "\n", "utf-8");
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
  console.error("Some masking operations failed.");
  process.exit(1);
} else {
  console.log("All masked samples generated and validated!");
}
