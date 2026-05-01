import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LOCALES, type Locale } from '../lib/bundle';
import { useTheme } from '../lib/theme';

const LABELS: Record<Locale, string> = { en: 'EN', de: 'DE', es: 'ES' };

export function LocaleSwitcher({
  current,
  onChange,
}: {
  current: Locale;
  onChange: (l: Locale) => void;
}) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.row,
        { borderColor: t.border, backgroundColor: t.surface },
      ]}
    >
      {LOCALES.map((loc, i) => {
        const active = loc === current;
        return (
          <Pressable
            key={loc}
            onPress={() => onChange(loc)}
            style={[
              styles.btn,
              active
                ? { backgroundColor: t.accent }
                : null,
              i > 0 ? { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: t.border } : null,
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? '#fff' : t.muted },
              ]}
            >
              {LABELS[loc]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
});
