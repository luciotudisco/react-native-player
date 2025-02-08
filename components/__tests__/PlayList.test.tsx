import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlayList from '@/components/PlayList';
import { useAudioPlayerStore } from '@/store/store';

jest.mock('@/store/store');

describe('PlayList Component', () => {
  const setTrackMock = jest.fn();

  beforeEach(() => {
    (useAudioPlayerStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        playlist: {
          items: [
            { name: 'Track 1', imageURI: 'https://example.com/track1.jpg', artist: 'Artist 1' },
            { name: 'Track 2', imageURI: 'https://example.com/track2.jpg', artist: 'Artist 2' },
          ],
        },
        setTrack: setTrackMock,
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the playlist items correctly', () => {
    const { getByText } = render(<PlayList />);

    // Check for track names in the document
    expect(getByText('Track 1')).toBeTruthy();
    expect(getByText('Track 2')).toBeTruthy();

    // Check for artist names
    expect(getByText('Artist 1')).toBeTruthy();
    expect(getByText('Artist 2')).toBeTruthy();
  });

  it('calls setTrack with the correct index when a track is pressed', () => {
    const { getByText } = render(<PlayList />);

    // Press on the first track
    fireEvent.press(getByText('Track 1'));
    expect(setTrackMock).toHaveBeenCalledWith(0);

    // Press on the second track
    fireEvent.press(getByText('Track 2'));
    expect(setTrackMock).toHaveBeenCalledWith(1);
  });
});
