import { MaterialIcons } from '@expo/vector-icons';
import { Icon, IIconProps, Pressable, Box } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

interface HamburgerIconProps extends IIconProps {
  navigation: {
    openDrawer: () => void;
  };
}

export default function HamburgerIcon({ navigation, ...iconProps }: HamburgerIconProps) {
  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      ml={2}
      p={2}
      borderRadius="md"
      _pressed={{
        bg: 'gray.100'
      }}
    >
      <Icon
        as={MaterialIcons}
        name="menu"
        size="6"
        color="gray.700"
        {...iconProps}
      />
    </Pressable>
  );
}