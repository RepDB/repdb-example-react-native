import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getImage, getSample, type ImageVariant } from '../lib/images';
import { useTheme } from '../lib/theme';

interface Props {
  /** Image-base slug (already alias-resolved by the caller). */
  slug: string;
  alt: string;
  /** Flat frames the exercise ships: ["start","peak"] or ["main"]. */
  variants: ImageVariant[];
  /** Pull frames from the Standard-tier sample set instead of the free flat set. */
  sample?: boolean;
  /** Cross-fade interval in ms. Set to 0 to pause auto-toggle. */
  interval?: number;
}

/**
 * Renders an exercise's frames. A start/peak pair cross-fades every `interval`
 * ms (tap to pause/resume); a single `main` pose renders statically. When
 * `sample` is set it draws from the Standard-tier teaser stills. The looping
 * animation is a separate component (AnimationViewer).
 */
export function StartPeakViewer({ slug, alt, variants, sample = false, interval = 1600 }: Props) {
  const t = useTheme();
  const resolve = (variant: ImageVariant) =>
    sample ? getSample(slug, variant) : getImage(slug, variant);

  const isPair = variants.includes('start') && variants.includes('peak');
  const start = resolve('start');
  const peak = resolve('peak');
  const single = resolve(variants.find((v) => v === 'main') ?? variants[0] ?? 'main');

  const fade = useRef(new Animated.Value(0)).current; // 0 = start, 1 = peak
  const [showingPeak, setShowingPeak] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isPair || paused || interval <= 0 || !start || !peak) return;
    const tick = () => {
      Animated.timing(fade, {
        toValue: showingPeak ? 0 : 1,
        duration: 280,
        useNativeDriver: true,
      }).start(() => {
        setShowingPeak((p) => !p);
      });
    };
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [isPair, showingPeak, paused, fade, interval, start, peak]);

  // Single-pose exercise (images: { flat: ["main"] }) — static frame, no fade.
  if (!isPair) {
    return (
      <View
        style={[styles.frame, { backgroundColor: t.imageBg, borderColor: t.border }]}
        accessibilityRole="image"
        accessibilityLabel={alt}
      >
        {single ? (
          <Image source={single} resizeMode="contain" style={styles.image} />
        ) : (
          <Text style={{ color: t.muted, fontSize: 12 }}>no image</Text>
        )}
        <View style={[styles.badge, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.badgeText, { color: t.muted }]}>POSE</Text>
        </View>
      </View>
    );
  }

  if (!start && !peak) {
    return (
      <View style={[styles.frame, { backgroundColor: t.surface2, borderColor: t.border }]}>
        <Text style={{ color: t.muted, fontSize: 12 }}>no image</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={[styles.frame, { backgroundColor: t.imageBg, borderColor: t.border }]}
      onPress={() => setPaused((p) => !p)}
      accessibilityRole="imagebutton"
      accessibilityLabel={alt}
      accessibilityHint="Tap to pause or resume the animation"
    >
      {start && (
        <Animated.Image
          source={start}
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          style={[
            styles.image,
            { opacity: fade.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
          ]}
        />
      )}
      {peak && (
        <Animated.Image
          source={peak}
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          style={[styles.image, { opacity: fade }]}
        />
      )}
      <View style={[styles.badge, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Text style={[styles.badgeText, { color: t.muted }]}>
          {paused ? 'PAUSED' : showingPeak ? 'PEAK' : 'START'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 4 / 3,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  badgeText: { fontSize: 10.5, fontWeight: '700', letterSpacing: 1 },
});
