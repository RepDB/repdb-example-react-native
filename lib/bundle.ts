import bundleJson from '../assets/exercises.json';

export type Locale = 'en' | 'de' | 'es';

export interface Exercise {
  id: string;
  name_en: string;
  name_de?: string;
  name_es?: string;
  category: string;
  difficulty?: string;
  equipment?: string;
  body_part?: string;
  primary_muscles?: string[];
  secondary_muscles?: string[];
  instructions_en?: string[];
  instructions_de?: string[];
  instructions_es?: string[];
  images?: { flat?: ('start' | 'peak')[]; classic?: ('start' | 'peak')[] };
}

interface Bundle {
  schema_version: number;
  locales: Locale[];
  exercises: Exercise[];
}

const BUNDLE = bundleJson as unknown as Bundle;

export const EXERCISES: Exercise[] = BUNDLE.exercises;
export const LOCALES: Locale[] = BUNDLE.locales;

export function exerciseName(ex: Exercise, locale: Locale): string {
  if (locale === 'de' && ex.name_de) return ex.name_de;
  if (locale === 'es' && ex.name_es) return ex.name_es;
  return ex.name_en;
}

export function exerciseInstructions(ex: Exercise, locale: Locale): string[] {
  if (locale === 'de' && ex.instructions_de?.length) return ex.instructions_de;
  if (locale === 'es' && ex.instructions_es?.length) return ex.instructions_es;
  return ex.instructions_en ?? [];
}

export function findExercise(slug: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === slug);
}

export function prettyEnum(v: string | undefined): string {
  if (!v) return '';
  return v.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
