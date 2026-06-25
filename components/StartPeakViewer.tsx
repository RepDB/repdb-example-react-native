import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { getImage, type ImageStyle } from '../lib/images';
import { useTheme } from '../lib/theme';

interface Props {
  slug: string;
  alt: string;
  /** Which still style to show: 'flat' (white bg) or 'classic' (transparent). */
  style?: ImageStyle;
  /** Toggle interval in ms. Set to 0 to pause auto-toggle. */
  interval?: number;
}

/**
 * Cross-fades between the start and peak frames every `interval` ms, in the
 * requested visual style. Tap to pause/resume. The looping animation is a
 * separate component (AnimationViewer).
 */
export function StartPeakViewer({ slug, alt, style = 'flat', interval = 1600 }: Props) {
  const t = useTheme();
  const start = getImage(slug, 'start', style);
  const peak = getImage(slug, 'peak', style);

  const fade = useRef(new Animated.Value(0)).current; // 0 = start, 1 = peak
  const [showingPeak, setShowingPeak] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || interval <= 0 || !start || !peak) return;
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
  }, [showingPeak, paused, fade, interval, start, peak]);

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
        <Text style={{ color: t.muted, fontSize: 10.5, fontWeight: '700', letterSpacing: 1 }}>
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
});
