import { DEMO_PLAYLIST, PlayList, PlayListItem } from '@/model/track';
import { Audio } from 'expo-av';
import { create } from 'zustand';

interface Track {
  isPlaying: boolean;
  sound: Audio.Sound | undefined;
  item: PlayListItem;
}

interface AudioPlayerState {
  playlist: PlayList;
  currentTrack: Track;
}

interface AudioPlayerActions {
  isFirstTrack: () => boolean;
  isLastTrack: () => boolean;
  next: () => void;
  pause: () => Promise<void>;
  play: () => Promise<void>;
  previous: () => void;
  resume: () => Promise<void>;
  setTrack: (item: PlayListItem) => void;
}

const DEFAULT_STATE: AudioPlayerState = {
  playlist: DEMO_PLAYLIST,
  currentTrack: {
    isPlaying: false,
    sound: undefined,
    item: DEMO_PLAYLIST.items[0],
  },
};

export const useAudioPlayerStore = create<AudioPlayerState & AudioPlayerActions>((set, get) => ({
  ...DEFAULT_STATE,
  /**
   * Returns true if the current track is the first track in the playlist.
   */
  isFirstTrack: () => {
    const { playlist, currentTrack } = get();
    return playlist.items.findIndex((item) => item.id === currentTrack.item.id) === 0;
  },
  /**
   * Returns true if the current track is the last track in the playlist.
   */
  isLastTrack: () => {
    const { playlist, currentTrack } = get();
    return playlist.items.findIndex((item) => item.id === currentTrack.item.id) === playlist.items.length - 1;
  },
  /**
   * Moves to the next track in the playlist.
   */
  next: () => {
    const { playlist, currentTrack } = get();
    const currentIndex = playlist.items.findIndex((item) => item.id === currentTrack.item.id);
    if (currentIndex === playlist.items.length - 1) {
      return;
    }
    set({ currentTrack: { ...currentTrack, item: playlist.items[currentIndex + 1] } });
  },
  /**
   * Pauses the current track.
   */
  pause: async () => {
    get().currentTrack.sound?.pauseAsync();
    set((state) => ({ currentTrack: { ...state.currentTrack, isPlaying: false } }));
  },
  /**
   * Plays the current track from the beginning.
   */
  play: async () => {
    const { currentTrack } = get();
    if (currentTrack.sound) {
      await currentTrack.sound.stopAsync();
      await currentTrack.sound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri: currentTrack.item.audioURI });
    sound.playAsync();
    set({ currentTrack: { isPlaying: true, sound, item: currentTrack.item } });
  },
  /**
   * Moves to the previous track in the playlist.
   */
  previous: () => {
    const { playlist, currentTrack } = get();
    const currentIndex = playlist.items.findIndex((item) => item.id === currentTrack.item.id);
    if (currentIndex === 0) {
      return;
    }
    set({ currentTrack: { ...currentTrack, item: playlist.items[currentIndex - 1] } });
  },
  /**
   * Resumes the current track from where it was paused.
   */
  resume: async () => {
    const { currentTrack } = get();
    if (currentTrack.sound) {
      currentTrack.sound.playAsync();
      set((state) => ({ currentTrack: { ...state.currentTrack, isPlaying: true } }));
    }
  },
  /**
   * Moves to the specified track in the playlist.
   */
  setTrack: (item: PlayListItem) => set((state) => ({ currentTrack: { ...state.currentTrack, item } })),
}));
