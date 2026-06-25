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
  animation?: boolean;
  met?: number;
}

/** A muscle or equipment entry from the bundle taxonomy. */
export interface TaxonomyEntry {
  name_en: string;
  name_de?: string;
  name_es?: string;
  image?: string;
}

interface Bundle {
  schema_version: number;
  locales: Locale[];
  exercises: Exercise[];
  muscles?: Record<string, TaxonomyEntry>;
  equipment?: Record<string, TaxonomyEntry>;
}

const BUNDLE = bundleJson as unknown as Bundle;

export const EXERCISES: Exercise[] = BUNDLE.exercises;
export const LOCALES: Locale[] = BUNDLE.locales;
export const MUSCLES: Record<string, TaxonomyEntry> = BUNDLE.muscles ?? {};
export const EQUIPMENT: Record<string, TaxonomyEntry> = BUNDLE.equipment ?? {};

/** True when the exercise ships both flat and classic stills (toggle-able). */
export function hasBothStyles(ex: Exercise): boolean {
  return Boolean(ex.images?.flat?.length && ex.images?.classic?.length);
}

function localized(entry: TaxonomyEntry | undefined, locale: Locale, fallback: string): string {
  if (!entry) return fallback;
  if (locale === 'de' && entry.name_de) return entry.name_de;
  if (locale === 'es' && entry.name_es) return entry.name_es;
  return entry.name_en;
}

export function muscleLabel(key: string, locale: Locale): string {
  return localized(MUSCLES[key], locale, prettyEnum(key));
}

export function muscleImageFile(key: string): string | undefined {
  return MUSCLES[key]?.image;
}

export function equipmentLabel(key: string, locale: Locale): string {
  return localized(EQUIPMENT[key], locale, prettyEnum(key));
}

export function equipmentImageFile(key: string): string | undefined {
  return EQUIPMENT[key]?.image;
}

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
