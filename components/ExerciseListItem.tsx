import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  type Exercise,
  type Locale,
  exerciseName,
  imageBase,
  prettyEnum,
  thumbVariant,
} from '../lib/bundle';
import { getImage } from '../lib/images';
import { useTheme } from '../lib/theme';
import { Pill } from './Pill';

export function ExerciseListItem({
  exercise,
  locale,
  onPress,
}: {
  exercise: Exercise;
  locale: Locale;
  onPress: () => void;
}) {
  const t = useTheme();
  const variant = thumbVariant(exercise);
  const thumb = variant ? getImage(imageBase(exercise), variant) : undefined;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: pressed ? t.surface2 : t.surface,
          borderColor: t.border,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Open ${exerciseName(exercise, locale)}`}
    >
      <View style={[styles.thumb, { backgroundColor: t.imageBg }]}>
        {thumb ? (
          <Image source={thumb} resizeMode="contain" style={styles.thumbImage} />
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={[styles.name, { color: t.text }]} numberOfLines={2}>
          {exerciseName(exercise, locale)}
        </Text>
        <View style={styles.pills}>
          {exercise.body_part ? <Pill label={prettyEnum(exercise.body_part)} /> : null}
          {exercise.equipment ? <Pill label={prettyEnum(exercise.equipment)} /> : null}
          {exercise.difficulty ? <Pill label={prettyEnum(exercise.difficulty)} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  thumb: {
    width: 84,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImage: { width: '100%', height: '100%' },
  body: { flex: 1, gap: 6 },
  name: { fontSize: 15, fontWeight: '600' },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
});
