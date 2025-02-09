import React, { useEffect, useState } from 'react';
import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Box } from './ui/box';
import { useAudioPlayerStore } from '@/store/store';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ChevronRight, ChevronLeft, PlayIcon, PauseIcon } from 'lucide-react-native';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PlayListItemThumbnail from './PlayListItemThumbnail';
dayjs.extend(duration);

export function AudioPlayer() {
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(null);
  const currentTrack = useAudioPlayerStore((state) => state.currentTrack);
  const isFirstTrack = useAudioPlayerStore((state) => state.isFirstTrack);
  const isLastTrack = useAudioPlayerStore((state) => state.isLastTrack);
  const next = useAudioPlayerStore((state) => state.next);
  const pause = useAudioPlayerStore((state) => state.pause);
  const play = useAudioPlayerStore((state) => state.play);
  const previous = useAudioPlayerStore((state) => state.previous);

  const positionMillis = playbackStatus?.isLoaded ? (playbackStatus.positionMillis ?? 0) : 0;
  const durationMillis = playbackStatus?.isLoaded ? (playbackStatus.durationMillis ?? 0) : 0;
  const showPreviousButton = !isFirstTrack();
  const showNextButton = !isLastTrack();

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
          setPlaybackStatus(status);
          if (status.didJustFinish) {
            // Play the next track when the current track finishes
            onNext();
          }
        }
      });
    }
  }, [currentTrack.sound]);

  const onNext = async () => {
    next();
    await play();
  };

  const onPrevious = async () => {
    previous();
    await play();
  };

  return (
    <Box style={styles.card}>
      <PlayListItemThumbnail item={currentTrack.item} size={64} />
      <Box style={styles.slider}>
        <Slider minValue={0} maxValue={durationMillis} value={positionMillis}>
          <SliderTrack style={styles.sliderTrack}>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <View style={styles.sliderDuration}>
          <Text style={styles.durationLabel}>{dayjs.duration(positionMillis, 'milliseconds').format('mm:ss')}</Text>
          {durationMillis > 0 && (
            <Text style={styles.durationLabel}>{dayjs.duration(durationMillis, 'milliseconds').format('mm:ss')}</Text>
          )}
        </View>
      </Box>
      <Box style={styles.buttonsBar}>
        <TouchableOpacity
          onPress={onPrevious}
          style={styles.button}
          aria-label="Previous track"
          disabled={!showPreviousButton}>
          <ChevronLeft size={32} color="white" strokeOpacity={showPreviousButton ? 1 : 0.2} />
        </TouchableOpacity>
        {!currentTrack.isPlaying ? (
          <TouchableOpacity onPress={play} style={styles.button} aria-label="Play track">
            <PlayIcon size={32} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pause} style={styles.button} aria-label="Pause track">
            <PauseIcon size={32} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onNext} style={styles.button} aria-label="Next track" disabled={!showNextButton}>
          <ChevronRight size={32} color="white" strokeOpacity={showNextButton ? 1 : 0.2} />
        </TouchableOpacity>
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
    minHeight: 6,
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
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
    justifyContent: 'center',
  },
});

export default AudioPlayer;
