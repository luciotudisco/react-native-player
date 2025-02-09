import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, SharedValue } from 'react-native-reanimated';

const DEFAULT_BAR_COLOR = '#000000';
const DEFAULT_NUMBER_OF_BARS = 3;
const DEFAULT_MAX_BAR_HEIGHT = 20;

/**
 * Single bar component that manages its own animated style.
 */
function AudioBar({ bar, color }: { bar: SharedValue<number>; color?: string }) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: bar.value,
    };
  });
  return <Animated.View testID="audio-bar" style={[styles.bar, animatedStyle, { backgroundColor: color }]} />;
}

/**
 * Component that renders a line of animated bars.
 */
export default function AudioLineAnimation({
  color = DEFAULT_BAR_COLOR,
  numberOfBars = DEFAULT_NUMBER_OF_BARS,
  maxBarHeight = DEFAULT_MAX_BAR_HEIGHT,
}: {
  color?: string;
  numberOfBars?: number;
  maxBarHeight?: number;
  animationDuration?: number;
  intervalDuration?: number;
}) {
  const barsRef = useRef<SharedValue<number>[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  barsRef.current = Array.from({ length: numberOfBars }, () => useSharedValue(0));

  /**
   * Randomly animate each bar on an interval.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      barsRef.current.forEach((bar) => {
        bar.value = withTiming(Math.random() * maxBarHeight, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        });
      });
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [maxBarHeight, numberOfBars]);

  return (
    <View style={[styles.container, { height: maxBarHeight }]} testID="audio-line-animation">
      {barsRef.current.map((bar, index) => (
        <AudioBar key={index} bar={bar} color={color} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 0,
    margin: 10,
  },
  bar: {
    borderRadius: 4,
    marginHorizontal: 2,
    width: 2,
  },
});
