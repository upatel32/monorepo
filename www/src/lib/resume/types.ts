/**
 * JSON Resume types, inferred from the zod schema in ./schema.ts so the two can't drift.
 * Every field is optional, so components must tolerate gaps.
 */
import type { z } from 'zod';
import type * as S from './schema.ts';

export type Resume = z.infer<typeof S.Resume>;
export type Basics = z.infer<typeof S.Basics>;
export type Location = z.infer<typeof S.Location>;
export type EntryLocation = z.infer<typeof S.EntryLocation>;
export type Profile = z.infer<typeof S.Profile>;
export type Work = z.infer<typeof S.Work>;
export type Volunteer = z.infer<typeof S.Volunteer>;
export type Education = z.infer<typeof S.Education>;
export type Award = z.infer<typeof S.Award>;
export type Certificate = z.infer<typeof S.Certificate>;
export type Publication = z.infer<typeof S.Publication>;
export type Skill = z.infer<typeof S.Skill>;
export type Language = z.infer<typeof S.Language>;
export type Interest = z.infer<typeof S.Interest>;
export type Reference = z.infer<typeof S.Reference>;
export type Project = z.infer<typeof S.Project>;
export type ResumeMeta = z.infer<typeof S.Meta>;
