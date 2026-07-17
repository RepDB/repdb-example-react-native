import { Image as ExpoImage } from 'expo-image';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { exerciseName, findExercise, type Locale } from '../lib/bundle';
import { SAMPLE_SLUGS, getSampleAnimation } from '../lib/images';
import { useTheme } from '../lib/theme';

/**
 * Paid-tier preview gallery: the five Standard-tier looping animations (the
 * exact clips shown on repdb.co), evaluation-only. The slug set is DERIVED from
 * SAMPLE_SLUGS (the SAMPLES map) — never hardcoded here.
 */
export function SampleGallery({ locale }: { locale: Locale }) {
  const t = useTheme();
  if (SAMPLE_SLUGS.length === 0) return null;

  return (
    <View style={[styles.section, { borderColor: t.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: t.text }]}>Paid tier preview</Text>
        <View style={[styles.badge, { backgroundColor: t.accentSoft, borderColor: t.accent }]}>
          <Text style={[styles.badgeText, { color: t.accent }]}>
            STANDARD TIER PREVIEW — EVALUATION ONLY
          </Text>
        </View>
      </View>

      <Text style={[styles.note, { color: t.muted }]}>
        Every paid-tier exercise ships a looping animation like these — the clips
        shown on repdb.co.{' '}
        <Text
          style={{ color: t.accent, fontWeight: '600' }}
          onPress={() => Linking.openURL('https://repdb.co/pricing')}
        >
          See pricing →
        </Text>
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SAMPLE_SLUGS.map((slug) => {
          const animation = getSampleAnimation(slug);
          if (!animation) return null;
          const label = findExercise(slug)
            ? exerciseName(findExercise(slug)!, locale)
            : prettySlug(slug);
          return (
            <View key={slug} style={styles.tile}>
              <View style={[styles.frame, { backgroundColor: t.imageBg, borderColor: t.border }]}>
                <ExpoImage
                  source={animation}
                  contentFit="contain"
                  autoplay
                  accessibilityLabel={`${label} — looping animation`}
                  style={styles.image}
                />
              </View>
              <Text style={[styles.tileLabel, { color: t.muted }]} numberOfLines={2}>
                {label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function prettySlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  title: { fontSize: 16, fontWeight: '700', letterSpacing: -0.2 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  badgeText: { fontSize: 9.5, fontWeight: '700', letterSpacing: 0.5 },
  note: { fontSize: 12, lineHeight: 17 },
  row: { gap: 12, paddingVertical: 2, paddingRight: 4 },
  tile: { width: 132, gap: 6 },
  frame: {
    width: 132,
    height: 132,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', padding: 10 },
  tileLabel: { fontSize: 12, fontWeight: '500', textAlign: 'center' },
});
