import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../lib/theme';

export function Pill({ label, accent = false }: { label: string; accent?: boolean }) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: accent ? t.accentSoft : t.surface2,
          borderColor: accent ? t.accent + '55' : t.border,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: accent ? t.accent : t.muted, fontWeight: accent ? '600' : '400' },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: { fontSize: 11, lineHeight: 14 },
});
