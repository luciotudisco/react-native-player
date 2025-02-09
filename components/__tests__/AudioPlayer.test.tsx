import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AudioPlayer from '@/components/AudioPlayer';
import { useAudioPlayerStore } from '@/store/store';
import { DEMO_PLAYLIST } from '@/model/track';

jest.mock('@/store/store');
jest.mock('expo-av');

describe('AudioPlayer', () => {
  const MOCK_SELECTOR = {
    currentTrack: {
      item: DEMO_PLAYLIST.items[0],
      sound: null,
      isPlaying: false,
    },
    isFirstTrack: () => false,
    isLastTrack: () => false,
    next: jest.fn(),
    pause: jest.fn(),
    play: jest.fn(),
    previous: jest.fn(),
  };

  beforeEach(() => {
    (useAudioPlayerStore as unknown as jest.Mock).mockImplementation((selector) => selector(MOCK_SELECTOR));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the play button when track is not playing', async () => {
    const { getByLabelText } = render(<AudioPlayer />);
    await waitFor(() => expect(getByLabelText('Play track')).toBeDefined());
  });

  it('renders the pause button when track is playing', () => {
    (useAudioPlayerStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ ...MOCK_SELECTOR, currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } }),
    );
    const { getByLabelText } = render(<AudioPlayer />);
    expect(getByLabelText('Pause track')).toBeDefined();
  });

  it('calls play when the play button is pressed', async () => {
    const { getByLabelText } = render(<AudioPlayer />);
    const playButton = getByLabelText('Play track');

    fireEvent.press(playButton);
    expect(MOCK_SELECTOR.play).toHaveBeenCalled();
  });

  it('calls pause when the pause button is pressed', async () => {
    (useAudioPlayerStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ ...MOCK_SELECTOR, currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } }),
    );
    const { getByLabelText } = render(<AudioPlayer />);
    const pauseButton = getByLabelText('Pause track');

    fireEvent.press(pauseButton);
    expect(MOCK_SELECTOR.pause).toHaveBeenCalled();
  });

  it('calls previous when the previous button is pressed', async () => {
    const { getByLabelText } = render(<AudioPlayer />);
    const prevButton = getByLabelText('Previous track');

    fireEvent.press(prevButton);
    expect(MOCK_SELECTOR.previous).toHaveBeenCalled();
  });

  it('calls next when the next button is pressed', async () => {
    const { getByLabelText } = render(<AudioPlayer />);
    const nextButton = getByLabelText('Next track');

    fireEvent.press(nextButton);
    expect(MOCK_SELECTOR.next).toHaveBeenCalled();
  });
});
