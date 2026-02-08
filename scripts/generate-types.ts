import { Project } from "ts-morph";
import { zodToTs, printNode, createAuxiliaryTypeStore } from "zod-to-ts";
import { resolve } from "node:path";
import type { ZodType } from "zod";

import {
  SpeakerSchema,
  FeedbackSchema,
  ProposalTimetableSchema,
  TimetableTrackSchema,
  ProposalSchema,
  ProposalsSchema,
  TrackSchema,
  TracksSchema,
  TagSchema,
  TimetableTimeslotSchema,
  TimetableTalkSchema,
  TimetableEntrySchema,
  TimetableSchema,
  SponsorSchema,
  SponsorPlanSchema,
  SponsorsSchema,
  StaffMemberSchema,
  StaffTypeSchema,
  StaffSchema,
  NewsSchema,
} from "../src/schemas/index.js";

const project = new Project();
const outputDir = resolve(import.meta.dirname, "../dist-types");

// スキーマ名 -> ファイルマッピング
// 1ファイルに関連する型をまとめる
interface TypeDef {
  name: string;
  schema: ZodType;
}

interface FileGroup {
  fileName: string;
  types: TypeDef[];
}

const fileGroups: FileGroup[] = [
  {
    fileName: "common.ts",
    types: [
      { name: "Speaker", schema: SpeakerSchema },
      { name: "Feedback", schema: FeedbackSchema },
      { name: "ProposalTimetable", schema: ProposalTimetableSchema },
      { name: "TimetableTrack", schema: TimetableTrackSchema },
    ],
  },
  {
    fileName: "proposals.ts",
    types: [
      { name: "Proposal", schema: ProposalSchema },
      { name: "Proposals", schema: ProposalsSchema },
    ],
  },
  {
    fileName: "tracks.ts",
    types: [
      { name: "Track", schema: TrackSchema },
      { name: "Tracks", schema: TracksSchema },
    ],
  },
  {
    fileName: "timetable.ts",
    types: [
      { name: "Tag", schema: TagSchema },
      { name: "TimetableTimeslot", schema: TimetableTimeslotSchema },
      { name: "TimetableTalk", schema: TimetableTalkSchema },
      { name: "TimetableEntry", schema: TimetableEntrySchema },
      { name: "Timetable", schema: TimetableSchema },
    ],
  },
  {
    fileName: "sponsors.ts",
    types: [
      { name: "Sponsor", schema: SponsorSchema },
      { name: "SponsorPlan", schema: SponsorPlanSchema },
      { name: "Sponsors", schema: SponsorsSchema },
    ],
  },
  {
    fileName: "staff.ts",
    types: [
      { name: "StaffMember", schema: StaffMemberSchema },
      { name: "StaffType", schema: StaffTypeSchema },
      { name: "Staff", schema: StaffSchema },
    ],
  },
  // {
  //   fileName: "news.ts",
  //   types: [
  //     { name: "NewsItem", schema: NewsItemSchema },
  //     { name: "News", schema: NewsSchema },
  //   ],
  // },
];

for (const { fileName, types } of fileGroups) {
  const sourceFile = project.createSourceFile(
    resolve(outputDir, fileName),
    "",
    { overwrite: true },
  );

  const store = createAuxiliaryTypeStore();

  for (const { name, schema } of types) {
    // 1. name は渡さず、schema と options(store) だけを渡す
    // ※このバージョンの zodToTs は pure な TypeNode を返す役割に徹しています
    const { node } = zodToTs(schema as any, { auxiliaryTypeStore: store });

    // 2. ts-morph 側で alias 名（name）を指定して追加する
    sourceFile.addTypeAlias({
      name: name, // ここで型名を指定
      type: printNode(node),
      isExported: true,
    });
  }

  console.log(`Generated: ${fileName}`);
}

project.saveSync();
console.log("\nAll type definitions generated in dist-types/");
