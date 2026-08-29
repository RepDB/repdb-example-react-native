import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExerciseListItem } from '../components/ExerciseListItem';
import { LocaleSwitcher } from '../components/LocaleSwitcher';
import { SampleGallery } from '../components/SampleGallery';
import { EXERCISES, type Locale, exerciseName } from '../lib/bundle';
import { useTheme } from '../lib/theme';

export default function ListScreen() {
  const t = useTheme();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('en');

  const sorted = [...EXERCISES].sort((a, b) =>
    exerciseName(a, locale).localeCompare(exerciseName(b, locale)),
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: t.text }]}>Workout Tracker</Text>
          <Text style={[styles.subtitle, { color: t.muted }]}>
            {EXERCISES.length} exercises from the RepDB public flat edition. Tap one to inspect.
          </Text>
        </View>
        <LocaleSwitcher current={locale} onChange={setLocale} />
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(e) => e.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <ExerciseListItem
            exercise={item}
            locale={locale}
            onPress={() =>
              router.push({ pathname: '/[slug]', params: { slug: item.id, locale } })
            }
          />
        )}
        ListFooterComponent={
          <>
            <View style={[styles.footer, { borderTopColor: t.border }]}>
              <Text style={[styles.footerText, { color: t.muted }]}>
                Exercise data by RepDB (repdb.co) — free tier, attribution required.
              </Text>
              <Text
                style={[styles.footerText, { color: t.accent, fontWeight: '600' }]}
                onPress={() => Linking.openURL('https://repdb.co/pricing')}
              >
                Want premium assets and a license without attribution? See pricing →
              </Text>
            </View>
          </>
        }
      />
      <View pointerEvents="box-none" style={styles.promoOverlay}>
        <SampleGallery locale={locale} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.3 },
  subtitle: { fontSize: 13, marginTop: 4 },
  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 180 },
  promoOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 10,
    alignItems: 'flex-end',
  },
  footer: {
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  footerText: { fontSize: 12 },
});
