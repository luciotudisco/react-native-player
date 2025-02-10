import { DEMO_PLAYLIST } from '@/model/track';
import { useAudioPlayerStore } from './store';
import { Audio } from 'expo-av';

jest.mock('expo-av');

describe('useAudioPlayerStore', () => {
  const mockSound: Partial<Audio.Sound> = {
    playAsync: jest.fn(),
    pauseAsync: jest.fn(),
    stopAsync: jest.fn(),
    unloadAsync: jest.fn(),
    setOnPlaybackStatusUpdate: jest.fn(),
  };

  beforeEach(() => {
    (Audio.Sound.createAsync as jest.Mock).mockResolvedValue({
      sound: mockSound,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    useAudioPlayerStore.setState(
      (state) => ({
        ...state,
        playlist: DEMO_PLAYLIST,
        currentTrack: {
          isPlaying: false,
          sound: undefined,
          item: DEMO_PLAYLIST.items[0],
        },
      }),
      true,
    );
  });

  it('should have the correct default state', () => {
    const state = useAudioPlayerStore.getState();
    expect(state.playlist).toEqual(DEMO_PLAYLIST);
    expect(state.currentTrack.isPlaying).toBe(false);
    expect(state.currentTrack.sound).toBeUndefined();
    expect(state.currentTrack.item).toEqual(DEMO_PLAYLIST.items[0]);
  });

  it('isFirstTrack should return true if on the first track, otherwise false', () => {
    const { isFirstTrack, next } = useAudioPlayerStore.getState();
    expect(isFirstTrack()).toBe(true);

    // Move to next track
    next();

    // Now isFirstTrack should be false
    expect(isFirstTrack()).toBe(false);
  });

  it('isLastTrack should return true if on the last track, otherwise false', () => {
    const { isLastTrack, next } = useAudioPlayerStore.getState();
    expect(isLastTrack()).toBe(false);

    // Move to the last track
    Array.from({ length: DEMO_PLAYLIST.items.length - 1 }).forEach(() => next());

    // Now should be the last track
    expect(isLastTrack()).toBe(true);
  });

  it('next should move to the next track if not the last track', () => {
    const { next } = useAudioPlayerStore.getState();

    next();

    // Should be on the second track
    const secondTrack = useAudioPlayerStore.getState().currentTrack.item;
    expect(secondTrack).toEqual(DEMO_PLAYLIST.items[1]);
  });

  it('next should do nothing if already on the last track', () => {
    // Move to the last track
    const { next } = useAudioPlayerStore.getState();
    Array.from({ length: DEMO_PLAYLIST.items.length - 1 }).forEach(() => next());

    // Try to move next from the last track
    next();

    // Should still be on the last track
    const lastTrack = DEMO_PLAYLIST.items[DEMO_PLAYLIST.items.length - 1];
    expect(useAudioPlayerStore.getState().currentTrack.item).toEqual(lastTrack);
  });

  it('previous should move to the previous track if not the first track', () => {
    const { next, previous } = useAudioPlayerStore.getState();

    // Move to the second track
    next();

    // Move back
    previous();

    // Should be back to the first track
    const firstTrack = useAudioPlayerStore.getState().currentTrack.item;
    expect(firstTrack).toEqual(DEMO_PLAYLIST.items[0]);
  });

  it('previous should do nothing if already on the first track', () => {
    const { previous } = useAudioPlayerStore.getState();

    // Try to move back from the first track
    previous();

    // Should still be on the first track
    const firstTrack = DEMO_PLAYLIST.items[0];
    expect(useAudioPlayerStore.getState().currentTrack.item).toEqual(firstTrack);
  });

  it('setTrack should update the current track item', () => {
    const { setTrack } = useAudioPlayerStore.getState();

    // Set the track to the last track
    const newTrack = DEMO_PLAYLIST.items[DEMO_PLAYLIST.items.length - 1];
    setTrack(newTrack);

    // Should be on the last track
    const updatedTrack = useAudioPlayerStore.getState().currentTrack.item;
    expect(updatedTrack).toEqual(newTrack);
  });

  it('play should start a new audio from the beginning', async () => {
    const store = useAudioPlayerStore.getState();

    // Play the current track
    await store.play();

    // Expect playAsync to be called
    expect(mockSound.playAsync).toHaveBeenCalled();
    expect(mockSound.stopAsync).not.toHaveBeenCalled();
    expect(mockSound.unloadAsync).not.toHaveBeenCalled();
  });

  it('play should restart the audio from the beginning, if an existing audio is set', async () => {
    const store = useAudioPlayerStore.getState();

    // Play the current track
    store.currentTrack.sound = mockSound as Audio.Sound;
    await store.play();

    // Expect playAsync to be called
    expect(mockSound.stopAsync).toHaveBeenCalled();
    expect(mockSound.unloadAsync).toHaveBeenCalled();
    expect(mockSound.playAsync).toHaveBeenCalled();
  });

  it('pause should stop the audio', async () => {
    const store = useAudioPlayerStore.getState();

    // Simulate a sound is already loaded.
    store.currentTrack.sound = mockSound as Audio.Sound;

    await store.pause();

    // Expect pauseAsync to be called
    expect(mockSound.pauseAsync).toHaveBeenCalledTimes(1);
  });

  it('resume should restart the audio without reloading from the start', async () => {
    const store = useAudioPlayerStore.getState();

    // Simulate a sound is already loaded.
    store.currentTrack.sound = mockSound as Audio.Sound;

    await store.resume();

    // Expect playAsync is called w/o reloading the sound
    expect(mockSound.playAsync).toHaveBeenCalled();
    expect(mockSound.stopAsync).not.toHaveBeenCalled();
    expect(mockSound.unloadAsync).not.toHaveBeenCalled();
  });
});
