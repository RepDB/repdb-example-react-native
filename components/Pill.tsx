import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../lib/theme';

export function Pill({
  label,
  accent = false,
  icon,
}: {
  label: string;
  accent?: boolean;
  /** Optional leading icon (a require()'d module id). */
  icon?: number;
}) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.pill,
        icon ? styles.pillWithIcon : null,
        {
          backgroundColor: accent ? t.accentSoft : t.surface2,
          borderColor: accent ? t.accent + '55' : t.border,
        },
      ]}
    >
      {icon ? (
        <Image source={icon} style={styles.icon} resizeMode="contain" accessibilityIgnoresInvertColors />
      ) : null}
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
  pillWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 5,
  },
  icon: { width: 14, height: 14 },
  text: { fontSize: 11, lineHeight: 14 },
});
