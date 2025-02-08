import { DEMO_PLAYLIST, PlayList } from '@/model/track';
import { create } from 'zustand';

interface AudioPlayerState {
  playlist: PlayList;
  currentTrackIndex: number;
}

interface AudioPlayerActions {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setTrack: (index: number) => void;
}

const DEFAULT_STATE: AudioPlayerState = {
  playlist: DEMO_PLAYLIST,
  currentTrackIndex: 0,
};

export const useAudioPlayerStore = create<AudioPlayerState & AudioPlayerActions>((set, get) => ({
  ...DEFAULT_STATE,
  play: () => {
    console.log('play');
  },
  pause: () => {
    console.log('pause');
  },
  next: () => {
    console.log('next');
  },
  previous: () => {
    console.log('previous');
  },
  seek: (time: number) => {
    console.log('seek', time);
  },
  setTrack: (index: number) => {
    set({ currentTrackIndex: index });
  },
}));
