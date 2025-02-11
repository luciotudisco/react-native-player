import React from 'react';
import { StyleSheet } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { IconButton } from '@/components/IconButton';
import { PlayIcon } from 'lucide-react-native';

describe('IconButton', () => {
  it('renders with full opacity (1.0) when not disabled', () => {
    const { getByLabelText } = render(
      <IconButton icon={<PlayIcon />} onPress={() => {}} accessibilityLabel="Test Button" />,
    );

    const button = getByLabelText('Test Button');
    const flattenedStyle = StyleSheet.flatten(button.props.style);
    expect(flattenedStyle.opacity).toBe(1.0);
  });

  it('renders with reduced opacity (0.5) when disabled', () => {
    const { getByLabelText } = render(
      <IconButton icon={<PlayIcon />} onPress={() => {}} accessibilityLabel="Test Button" disabled />,
    );

    const button = getByLabelText('Test Button');
    const flattenedStyle = StyleSheet.flatten(button.props.style);
    expect(flattenedStyle.opacity).toBe(0.5);
  });

  it('calls onPress when pressed and not disabled', () => {
    const onPressMock = jest.fn();
    const { getByLabelText } = render(
      <IconButton icon={<PlayIcon />} onPress={onPressMock} accessibilityLabel="Test Button" />,
    );

    const button = getByLabelText('Test Button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when pressed if disabled', () => {
    const onPressMock = jest.fn();
    const { getByLabelText } = render(
      <IconButton icon={<PlayIcon />} onPress={onPressMock} accessibilityLabel="Test Button" disabled />,
    );

    const button = getByLabelText('Test Button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
