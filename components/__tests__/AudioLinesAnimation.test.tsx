import React from 'react';
import { render } from '@testing-library/react-native';
import AudioLineAnimation from '../AudioLinesAnimation';

describe('AudioLineAnimation', () => {
  it('renders with specified props', () => {
    const { getAllByTestId } = render(<AudioLineAnimation numberOfBars={5} color="red" />);

    const bars = getAllByTestId('audio-bar');
    expect(bars.length).toBe(5);
    bars.forEach((bar) => expect(bar).toHaveStyle({ backgroundColor: 'red' }));
  });
});
