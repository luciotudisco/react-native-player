import React, { act } from 'react';
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
      sound: {
        setOnPlaybackStatusUpdate: jest.fn(),
        setPositionAsync: jest.fn().mockResolvedValue(undefined),
      },
      isPlaying: false,
    },
    isFirstTrack: () => false,
    isLastTrack: () => false,
    next: jest.fn(),
    pause: jest.fn(),
    play: jest.fn(),
    previous: jest.fn(),
    resume: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (overrides: Partial<typeof MOCK_SELECTOR> = {}) => {
    // Merge the default MOCK_SELECTOR with any overrides.
    const store = {
      ...MOCK_SELECTOR,
      ...overrides,
      currentTrack: {
        ...MOCK_SELECTOR.currentTrack,
        ...(overrides.currentTrack || {}),
      },
    };

    (useAudioPlayerStore as unknown as jest.Mock).mockImplementation((selector) => selector(store));
  };

  it('renders the play button when track is not playing', async () => {
    setup();
    const { getByLabelText } = render(<AudioPlayer />);
    await waitFor(() => expect(getByLabelText('Play track')).toBeDefined());
  });

  it('renders the pause button when track is playing', () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    const { getByLabelText } = render(<AudioPlayer />);
    expect(getByLabelText('Pause track')).toBeDefined();
  });

  it('calls resume when the play button is pressed', async () => {
    setup();
    const { getByLabelText } = render(<AudioPlayer />);
    const playButton = getByLabelText('Play track');

    fireEvent.press(playButton);
    expect(MOCK_SELECTOR.resume).toHaveBeenCalled();
  });

  it('calls pause when the pause button is pressed', async () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    const { getByLabelText } = render(<AudioPlayer />);
    const pauseButton = getByLabelText('Pause track');

    fireEvent.press(pauseButton);
    expect(MOCK_SELECTOR.pause).toHaveBeenCalled();
  });

  it('calls previous when the previous button is pressed', async () => {
    setup();
    const { getByLabelText } = render(<AudioPlayer />);
    const prevButton = getByLabelText('Previous track');

    fireEvent.press(prevButton);
    expect(MOCK_SELECTOR.previous).toHaveBeenCalled();
    expect(MOCK_SELECTOR.play).not.toHaveBeenCalled();
  });

  it('calls previous and play when the play button is pressed, if the audio player is already playing', async () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    const { getByLabelText } = render(<AudioPlayer />);
    const prevButton = getByLabelText('Previous track');

    fireEvent.press(prevButton);
    expect(MOCK_SELECTOR.previous).toHaveBeenCalled();
    expect(MOCK_SELECTOR.play).toHaveBeenCalled();
  });

  it('calls next when the next button is pressed', async () => {
    setup();
    const { getByLabelText } = render(<AudioPlayer />);
    const nextButton = getByLabelText('Next track');

    fireEvent.press(nextButton);
    expect(MOCK_SELECTOR.next).toHaveBeenCalled();
    expect(MOCK_SELECTOR.play).not.toHaveBeenCalled();
  });

  it('calls next and play when the next button is pressed, if the audio player is already playing', async () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    const { getByLabelText } = render(<AudioPlayer />);
    const nextButton = getByLabelText('Next track');

    fireEvent.press(nextButton);
    expect(MOCK_SELECTOR.next).toHaveBeenCalled();
    expect(MOCK_SELECTOR.play).toHaveBeenCalled();
  });

  it('seeks backward when the rewind button is pressed', async () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    const { getByLabelText } = render(<AudioPlayer />);

    const rewindButton = getByLabelText('Rewind track');
    fireEvent.press(rewindButton);
    expect(MOCK_SELECTOR.currentTrack.sound.setPositionAsync).toHaveBeenCalled();
  });

  it('seeks forward when the fast forward button is pressed', async () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    const { getByLabelText } = render(<AudioPlayer />);

    const fastForwardButton = getByLabelText('Fast Forward');
    fireEvent.press(fastForwardButton);
    expect(MOCK_SELECTOR.currentTrack.sound.setPositionAsync).toHaveBeenCalled();
  });

  it('plays the next track when the current track finishes', async () => {
    setup({ currentTrack: { ...MOCK_SELECTOR.currentTrack, isPlaying: true } });
    render(<AudioPlayer />);

    // Simulate that the track just finished.
    const playbackStatusUpdateCallback = MOCK_SELECTOR.currentTrack.sound.setOnPlaybackStatusUpdate.mock.calls[0][0];
    await act(async () => {
      playbackStatusUpdateCallback({
        isLoaded: true,
        didJustFinish: true,
        positionMillis: 20000,
        durationMillis: 20000,
      });
    });
    expect(MOCK_SELECTOR.next).toHaveBeenCalled();
    expect(MOCK_SELECTOR.play).toHaveBeenCalled();
  });
});
