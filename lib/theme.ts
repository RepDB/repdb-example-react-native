// Shared theme tokens. Same sky-blue accent family as the Next.js & Flutter
// sister demos. Resolve at runtime via `useTheme()` for light/dark.

import { useColorScheme } from 'react-native';

export interface Theme {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  borderStrong: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
  imageBg: string;
}

const light: Theme = {
  bg: '#ffffff',
  surface: '#ffffff',
  surface2: '#f4f4f5',
  border: 'rgba(0, 0, 0, 0.10)',
  borderStrong: 'rgba(0, 0, 0, 0.20)',
  text: '#0a0a0a',
  muted: '#525252',
  accent: '#2563eb',
  accentSoft: 'rgba(37, 99, 235, 0.12)',
  imageBg: '#dbeafe',
};

const dark: Theme = {
  bg: '#0b0b0d',
  surface: '#161618',
  surface2: '#1d1d20',
  border: 'rgba(255, 255, 255, 0.10)',
  borderStrong: 'rgba(255, 255, 255, 0.22)',
  text: '#ededed',
  muted: '#a1a1aa',
  accent: '#60a5fa',
  accentSoft: 'rgba(96, 165, 250, 0.18)',
  imageBg: '#1c2740',
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
