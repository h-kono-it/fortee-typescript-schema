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
  moduleDoc: string;
  types: TypeDef[];
}

const fileGroups: FileGroup[] = [
  {
    fileName: "common.ts",
    moduleDoc:
      "fortee APIの共通型定義。Speaker, Feedbackなど複数のエンドポイントで共通して使われる型を提供します。",
    types: [
      { name: "Speaker", schema: SpeakerSchema },
      { name: "Feedback", schema: FeedbackSchema },
      { name: "ProposalTimetable", schema: ProposalTimetableSchema },
      { name: "TimetableTrack", schema: TimetableTrackSchema },
    ],
  },
  {
    fileName: "proposals.ts",
    moduleDoc:
      "fortee APIのプロポーザル関連の型定義。セッション応募情報の型を提供します。",
    types: [
      { name: "Proposal", schema: ProposalSchema },
      { name: "Proposals", schema: ProposalsSchema },
    ],
  },
  {
    fileName: "tracks.ts",
    moduleDoc:
      "fortee APIのトラック関連の型定義。カンファレンスのトラック情報の型を提供します。",
    types: [
      { name: "Track", schema: TrackSchema },
      { name: "Tracks", schema: TracksSchema },
    ],
  },
  {
    fileName: "timetable.ts",
    moduleDoc:
      "fortee APIのタイムテーブル関連の型定義。カンファレンスのスケジュール情報の型を提供します。",
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
    moduleDoc:
      "fortee APIのスポンサー関連の型定義。カンファレンスのスポンサー情報の型を提供します。",
    types: [
      { name: "Sponsor", schema: SponsorSchema },
      { name: "SponsorPlan", schema: SponsorPlanSchema },
      { name: "Sponsors", schema: SponsorsSchema },
    ],
  },
  {
    fileName: "staff.ts",
    moduleDoc:
      "fortee APIのスタッフ関連の型定義。カンファレンスの運営スタッフ情報の型を提供します。",
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

for (const { fileName, moduleDoc, types } of fileGroups) {
  const sourceFile = project.createSourceFile(
    resolve(outputDir, fileName),
    "",
    { overwrite: true },
  );

  sourceFile.insertText(0, `/**\n * ${moduleDoc}\n * @module\n */\n\n`);

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
