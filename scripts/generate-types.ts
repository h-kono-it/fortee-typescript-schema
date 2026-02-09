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
  doc: string;
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
      { name: "Speaker", doc: "スピーカー情報", schema: SpeakerSchema },
      { name: "Feedback", doc: "フィードバック情報", schema: FeedbackSchema },
      { name: "ProposalTimetable", doc: "プロポーザルのタイムテーブル情報", schema: ProposalTimetableSchema },
      { name: "TimetableTrack", doc: "タイムテーブルのトラック情報", schema: TimetableTrackSchema },
    ],
  },
  {
    fileName: "proposals.ts",
    moduleDoc:
      "fortee APIのプロポーザル関連の型定義。セッション応募情報の型を提供します。",
    types: [
      { name: "Proposal", doc: "プロポーザル（セッション応募）情報", schema: ProposalSchema },
      { name: "Proposals", doc: "プロポーザル一覧", schema: ProposalsSchema },
    ],
  },
  {
    fileName: "tracks.ts",
    moduleDoc:
      "fortee APIのトラック関連の型定義。カンファレンスのトラック情報の型を提供します。",
    types: [
      { name: "Track", doc: "トラック情報", schema: TrackSchema },
      { name: "Tracks", doc: "トラック一覧", schema: TracksSchema },
    ],
  },
  {
    fileName: "timetable.ts",
    moduleDoc:
      "fortee APIのタイムテーブル関連の型定義。カンファレンスのスケジュール情報の型を提供します。",
    types: [
      { name: "Tag", doc: "タグ情報", schema: TagSchema },
      { name: "TimetableTimeslot", doc: "タイムテーブルのタイムスロット情報", schema: TimetableTimeslotSchema },
      { name: "TimetableTalk", doc: "タイムテーブルのトーク情報", schema: TimetableTalkSchema },
      { name: "TimetableEntry", doc: "タイムテーブルのエントリ（タイムスロットまたはトーク）", schema: TimetableEntrySchema },
      { name: "Timetable", doc: "タイムテーブル", schema: TimetableSchema },
    ],
  },
  {
    fileName: "sponsors.ts",
    moduleDoc:
      "fortee APIのスポンサー関連の型定義。カンファレンスのスポンサー情報の型を提供します。",
    types: [
      { name: "Sponsor", doc: "スポンサー情報", schema: SponsorSchema },
      { name: "SponsorPlan", doc: "スポンサープラン情報", schema: SponsorPlanSchema },
      { name: "Sponsors", doc: "スポンサー一覧", schema: SponsorsSchema },
    ],
  },
  {
    fileName: "staff.ts",
    moduleDoc:
      "fortee APIのスタッフ関連の型定義。カンファレンスの運営スタッフ情報の型を提供します。",
    types: [
      { name: "StaffMember", doc: "スタッフメンバー情報", schema: StaffMemberSchema },
      { name: "StaffType", doc: "スタッフ種別情報", schema: StaffTypeSchema },
      { name: "Staff", doc: "スタッフ一覧", schema: StaffSchema },
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

  for (const { name, doc, schema } of types) {
    // 1. name は渡さず、schema と options(store) だけを渡す
    // ※このバージョンの zodToTs は pure な TypeNode を返す役割に徹しています
    const { node } = zodToTs(schema as any, { auxiliaryTypeStore: store });

    // 2. ts-morph 側で alias 名（name）を指定して追加する
    sourceFile.addTypeAlias({
      name: name, // ここで型名を指定
      type: printNode(node),
      isExported: true,
      docs: [{ description: doc }],
    });
  }

  console.log(`Generated: ${fileName}`);
}

project.saveSync();
console.log("\nAll type definitions generated in dist-types/");
