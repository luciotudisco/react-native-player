import React from 'react';
import { render } from '@testing-library/react-native';
import PlayListItemThumbnail from '@/components/PlayListItemThumbnail';
import { PlayListItem } from '@/model/track';

describe('PlayListItemThumbnail', () => {
  it('renders the thumbnail with correct data', () => {
    const item: PlayListItem = {
      id: '1',
      artist: 'Sample Artist',
      audioURI: 'http://example.com/test.mp3',
      imageURI: 'http://example.com/test.jpg',
      name: 'Sample Track',
    };

    const { getByText, getByRole } = render(<PlayListItemThumbnail item={item} size={100} />);

    expect(getByText('Sample Track')).toBeTruthy();
    expect(getByText('Sample Artist')).toBeTruthy();

    const image = getByRole('image');
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe('http://example.com/test.jpg');
    expect(image.props.alt).toBe('Track Sample Track');
  });
});
