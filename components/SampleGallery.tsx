import { Image as ExpoImage } from 'expo-image';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { exerciseName, findExercise, type Locale } from '../lib/bundle';
import { SAMPLE_SLUGS, getSampleAnimation } from '../lib/images';
import { useTheme } from '../lib/theme';

/**
 * Paid-tier preview gallery: Standard-tier looping animation(s) (the exact
 * clips shown on repdb.co). The slug set is DERIVED from SAMPLE_SLUGS (the
 * SAMPLES map) — never hardcoded here.
 */
export function SampleGallery({ locale }: { locale: Locale }) {
  const t = useTheme();
  if (SAMPLE_SLUGS.length === 0) return null;

  return (
    <View
      style={[
        styles.section,
        {
          backgroundColor: t.surface,
          borderColor: t.borderStrong,
          shadowColor: t.text,
        },
      ]}
    >
      <View style={styles.copy}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: t.text }]}>Paid tier preview</Text>
          <View
            style={[styles.badge, { backgroundColor: t.accentSoft, borderColor: t.accent }]}
          >
            <Text style={[styles.badgeText, { color: t.accent }]}>STANDARD TIER</Text>
          </View>
        </View>

        <Text style={[styles.note, { color: t.muted }]}>
          Looping animations for most exercises.{' '}
          <Text
            style={{ color: t.accent, fontWeight: '600' }}
            onPress={() => Linking.openURL('https://repdb.co/pricing')}
          >
            See pricing →
          </Text>
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroller}
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
    width: '100%',
    maxWidth: 620,
    minHeight: 118,
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 12,
  },
  copy: { flex: 1, minWidth: 0, gap: 7 },
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
  scroller: { flexGrow: 0, flexShrink: 1, maxWidth: 204 },
  row: { gap: 10 },
  tile: { width: 92, gap: 4 },
  frame: {
    width: 92,
    height: 92,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', padding: 7 },
  tileLabel: { fontSize: 10.5, fontWeight: '500', textAlign: 'center' },
});
