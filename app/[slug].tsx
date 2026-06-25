import { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pill } from '../components/Pill';
import { AnimationViewer } from '../components/AnimationViewer';
import { StartPeakViewer } from '../components/StartPeakViewer';
import {
  equipmentImageFile,
  equipmentLabel,
  exerciseInstructions,
  exerciseName,
  findExercise,
  hasBothStyles,
  type Locale,
  muscleImageFile,
  muscleLabel,
  prettyEnum,
} from '../lib/bundle';
import { getEquipmentIcon, getMuscleIcon, type ImageStyle } from '../lib/images';
import { useTheme } from '../lib/theme';

export default function DetailScreen() {
  const t = useTheme();
  const { slug, locale: localeRaw } = useLocalSearchParams<{
    slug: string;
    locale?: string;
  }>();
  const locale: Locale =
    localeRaw === 'de' || localeRaw === 'es' ? localeRaw : 'en';
  const [style, setStyle] = useState<ImageStyle>('flat');
  const exercise = findExercise(slug);

  if (!exercise) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={{ color: t.muted }}>No exercise with id "{slug}"</Text>
      </View>
    );
  }

  const name = exerciseName(exercise, locale);
  const instructions = exerciseInstructions(exercise, locale);
  const canToggle = hasBothStyles(exercise);
  const equipIcon = exercise.equipment
    ? getEquipmentIcon(equipmentImageFile(exercise.equipment))
    : undefined;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={styles.content}
    >
      <Stack.Screen options={{ title: name, headerBackTitle: 'Back' }} />

      <View style={styles.tags}>
        {exercise.body_part ? <Pill label={prettyEnum(exercise.body_part)} /> : null}
        {exercise.equipment ? (
          <Pill label={equipmentLabel(exercise.equipment, locale)} icon={equipIcon} />
        ) : null}
        {exercise.difficulty ? <Pill label={prettyEnum(exercise.difficulty)} /> : null}
        <Pill label={prettyEnum(exercise.category)} />
        {typeof exercise.met === 'number' ? <Pill label={`MET · ${exercise.met}`} /> : null}
      </View>

      <AnimationViewer slug={exercise.id} alt={`${name} — animation`} />

      {canToggle ? <StyleToggle value={style} onChange={setStyle} /> : null}
      <StartPeakViewer slug={exercise.id} alt={name} style={style} />
      <Text style={[styles.viewerHint, { color: t.muted }]}>
        Tap the frames to pause / resume the cross-fade.
      </Text>

      {instructions.length > 0 && (
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.cardTitle, { color: t.muted }]}>INSTRUCTIONS</Text>
          {instructions.map((step, i) => (
            <View key={i} style={styles.step}>
              <Text style={[styles.stepNum, { color: t.muted }]}>{i + 1}.</Text>
              <Text style={[styles.stepText, { color: t.text }]}>{step}</Text>
            </View>
          ))}
        </View>
      )}

      <MuscleSection
        title="PRIMARY MUSCLES"
        muscles={exercise.primary_muscles}
        locale={locale}
        accent
      />
      <MuscleSection
        title="SECONDARY MUSCLES"
        muscles={exercise.secondary_muscles}
        locale={locale}
      />
    </ScrollView>
  );
}

function StyleToggle({
  value,
  onChange,
}: {
  value: ImageStyle;
  onChange: (s: ImageStyle) => void;
}) {
  const t = useTheme();
  const options: ImageStyle[] = ['flat', 'classic'];
  return (
    <View style={styles.toggleRow}>
      <Text style={[styles.cardTitle, { color: t.muted }]}>STYLE</Text>
      <View style={[styles.toggle, { borderColor: t.border, backgroundColor: t.surface }]}>
        {options.map((opt) => {
          const on = opt === value;
          return (
            <Pressable
              key={opt}
              onPress={() => onChange(opt)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              style={[styles.toggleBtn, on && { backgroundColor: t.accent }]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: on ? '700' : '500',
                  color: on ? '#fff' : t.muted,
                  textTransform: 'capitalize',
                }}
              >
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function MuscleSection({
  title,
  muscles,
  locale,
  accent = false,
}: {
  title: string;
  muscles?: string[];
  locale: Locale;
  accent?: boolean;
}) {
  const t = useTheme();
  if (!muscles?.length) return null;
  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.cardTitle, { color: t.muted }]}>{title}</Text>
      <View style={styles.tags}>
        {muscles.map((m) => (
          <Pill
            key={m}
            label={muscleLabel(m, locale)}
            icon={getMuscleIcon(muscleImageFile(m))}
            accent={accent}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: -8 },
  toggle: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 2,
  },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  viewerHint: { fontSize: 11, textAlign: 'center', marginTop: -8 },
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  step: { flexDirection: 'row', gap: 8 },
  stepNum: { width: 22, fontSize: 14, fontVariant: ['tabular-nums'] },
  stepText: { flex: 1, fontSize: 14, lineHeight: 20 },
});
