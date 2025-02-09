import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export interface IconButtonProps {
  icon: React.ReactElement;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export const IconButton: React.FC<IconButton> = ({ icon, onPress, disabled = false, accessibilityLabel }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      aria-label={accessibilityLabel}
      style={[styles.button, { opacity: disabled ? 0.5 : 1.0 }]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
    justifyContent: 'center',
  },
});
