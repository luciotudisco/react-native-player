import React, { useEffect, useMemo, useState } from 'react';
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Box } from './ui/box';
import { useAudioPlayerStore } from '@/store/store';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { PlayIcon, PauseIcon, FastForwardIcon, SkipForwardIcon, SkipBackIcon, RewindIcon } from 'lucide-react-native';
import { Slider, SliderFilledTrack, SliderTrack } from '@/components/ui/slider';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PlayListItemThumbnail from '@/components/PlayListItemThumbnail';
import { IconButton } from '@/components/IconButton';
dayjs.extend(duration);

/**
 * The number of seconds to seek forward or backward when the user presses the fast forward or rewind buttons.
 */
const SEEK_DELTA_SECONDS = 5;

/**
 * The AudioPlayer component with play, pause, next, and previous buttons.
 */
export function AudioPlayer() {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack);
  const isFirstTrack = useAudioPlayerStore((state) => state.isFirstTrack);
  const isLastTrack = useAudioPlayerStore((state) => state.isLastTrack);
  const next = useAudioPlayerStore((state) => state.next);
  const pause = useAudioPlayerStore((state) => state.pause);
  const play = useAudioPlayerStore((state) => state.play);
  const previous = useAudioPlayerStore((state) => state.previous);
  const resume = useAudioPlayerStore((state) => state.resume);

  const currentSeconds = status?.isLoaded ? Math.floor(status.positionMillis / 1000) : 0;
  const durationSeconds = status?.isLoaded && status.durationMillis ? Math.floor(status.durationMillis / 1000) : 0;
  const showPreviousButton = !isFirstTrack();
  const showNextButton = !isLastTrack();

  const formattedPosition = useMemo(() => {
    return dayjs.duration(currentSeconds, 'seconds').format('mm:ss');
  }, [currentSeconds]);

  const formattedDuration = useMemo(() => {
    return dayjs.duration(durationSeconds, 'seconds').format('mm:ss');
  }, [durationSeconds]);

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });
    })();
  }, []);

  useEffect(() => {
    if (currentTrack.sound) {
      currentTrack.sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setStatus(status);
          if (status.didJustFinish) {
            onNext(); // Play the next track when the current track finishes
          }
        }
      });
    }
  }, [currentTrack.sound]);

  const onNext = async () => {
    next();
    if (currentTrack.isPlaying) {
      await play();
    }
  };

  const onPrevious = async () => {
    previous();
    if (currentTrack.isPlaying) {
      await play();
    }
  };

  const onSeek = async (value: number) => {
    if (currentTrack.sound) {
      const positionMillis = value * 1000;
      await currentTrack.sound.setPositionAsync(positionMillis);
    }
  };

  return (
    <Box style={styles.card}>
      <PlayListItemThumbnail item={currentTrack.item} size={64} />
      <Box style={styles.slider}>
        <Slider
          minValue={0}
          maxValue={durationSeconds}
          value={currentSeconds}>
          <SliderTrack style={styles.sliderTrack}>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
        <View style={styles.sliderDuration}>
          <Text style={styles.durationLabel}>{formattedPosition}</Text>
          {durationSeconds > 0 && <Text style={styles.durationLabel}>{formattedDuration}</Text>}
        </View>
      </Box>
      <Box style={styles.buttonsBar}>
        <IconButton
          onPress={onPrevious}
          accessibilityLabel="Previous track"
          disabled={!showPreviousButton}
          icon={<SkipBackIcon size={28} color="white" />}
        />
        <IconButton
          onPress={() => onSeek(Math.max(currentSeconds - SEEK_DELTA_SECONDS, 0))}
          accessibilityLabel="Rewind track"
          disabled={!currentTrack.sound}
          icon={<RewindIcon size={28} color="white" />}
        />
        {!currentTrack.isPlaying ? (
          <IconButton
            onPress={currentTrack.sound ? resume : play}
            accessibilityLabel="Play track"
            icon={<PlayIcon size={48} color="white" />}
          />
        ) : (
          <IconButton onPress={pause} accessibilityLabel="Pause track" icon={<PauseIcon size={48} color="white" />} />
        )}
        <IconButton
          onPress={() => onSeek(Math.min(currentSeconds + SEEK_DELTA_SECONDS, durationSeconds))}
          accessibilityLabel="Fast Forward"
          disabled={!currentTrack.sound}
          icon={<FastForwardIcon size={28} color="white" />}
        />
        <IconButton
          onPress={onNext}
          accessibilityLabel="Next track"
          disabled={!showNextButton}
          icon={<SkipForwardIcon size={28} color="white" />}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171717',
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    gap: 20,
    minHeigth: 350,
    padding: 50,
    paddingBottom: 60,
    width: '100%',
  },
  slider: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 5,
    width: '100%',
  },
  sliderTrack: {
    minHeight: 8,
  },
  sliderDuration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  durationLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '100',
  },
  buttonsBar: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AudioPlayer;
