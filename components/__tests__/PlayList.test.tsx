import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PlayList from '@/components/PlayList';
import { useAudioPlayerStore } from '@/store/store';
import { DEMO_PLAYLIST } from '@/model/track';

jest.mock('@/store/store');

describe('PlayList Component', () => {
  const mockIsPlaying = jest.fn().mockReturnValue(false);
  const mockPlay = jest.fn();
  const mockSetTrack = jest.fn();
  const mockShowAudioPlayerCallback = jest.fn();

  beforeEach(() => {
    (useAudioPlayerStore as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({
        playlist: DEMO_PLAYLIST,
        currentTrack: { isPlaying: mockIsPlaying, sound: undefined, item: DEMO_PLAYLIST.items[0] },
        play: mockPlay,
        setTrack: mockSetTrack,
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the playlist items correctly', () => {
    const { getByText } = render(<PlayList showAudioPlayerCallback={mockShowAudioPlayerCallback} />);

    // Check for track names
    DEMO_PLAYLIST.items.forEach((item) => {
      expect(getByText(item.name)).toBeTruthy();
    });

    // Check for artist names
    DEMO_PLAYLIST.items.forEach((item) => {
      expect(getByText(item.artist)).toBeTruthy();
    });
  });

  it('calls setTrack and play when a track is selected', async () => {
    const { getByText } = render(<PlayList showAudioPlayerCallback={mockShowAudioPlayerCallback} />);

    // Press on the second track.
    fireEvent.press(getByText(DEMO_PLAYLIST.items[0].name));

    // Check if the setTrack and play functions were called.
    await waitFor(() => expect(mockSetTrack).toHaveBeenCalledWith(DEMO_PLAYLIST.items[0]));
    expect(mockPlay).toHaveBeenCalled();
    expect(mockShowAudioPlayerCallback).toHaveBeenCalled();
  });

  it('renders the audio line animation when the current track is playing', () => {
    mockIsPlaying.mockReturnValue(true);
    const { getByTestId } = render(<PlayList showAudioPlayerCallback={mockShowAudioPlayerCallback} />);

    const audioLineAnimation = getByTestId('audio-line-animation');
    expect(audioLineAnimation).toBeTruthy();
  });
});
