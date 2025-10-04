import { Ionicons } from '@expo/vector-icons';
import { Icon, IIconProps } from 'native-base';
import React from 'react';

interface AddIconProps extends IIconProps {
  onPress?: () => void;
}

export default function AddIcon({ onPress, ...iconProps }: AddIconProps) {
  return (
    <Icon
      onPress={onPress}
      as={Ionicons}
      name={'add'}
      size="7"
      marginRight={-2}
      {...iconProps}
    />
  );
}