import { Image as ExpoImage } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { getAnimation } from '../lib/images';
import { useTheme } from '../lib/theme';

/**
 * Plays the exercise's looping animated WebP via expo-image (stock RN <Image>
 * can't animate WebP). Renders nothing when the exercise has no animation.
 */
export function AnimationViewer({ slug, alt }: { slug: string; alt: string }) {
  const t = useTheme();
  const animation = getAnimation(slug);
  if (!animation) return null;

  return (
    <View
      style={[styles.frame, { backgroundColor: t.imageBg, borderColor: t.border }]}
      accessibilityRole="image"
      accessibilityLabel={alt}
    >
      <ExpoImage source={animation} contentFit="contain" autoplay style={styles.image} />
      <View style={[styles.badge, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Text style={{ color: t.muted, fontSize: 10.5, fontWeight: '700', letterSpacing: 1 }}>
          LOOP
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', padding: 16 },
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
