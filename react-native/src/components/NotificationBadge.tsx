import React from 'react';
import { Badge, Text } from 'native-base';

interface NotificationBadgeProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  maxCount?: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  size = 'sm',
  maxCount = 99
}) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <Badge
      colorScheme="red"
      variant="solid"
      borderRadius="full"
      position="absolute"
      top={-2}
      right={-2}
      minW={size === 'sm' ? 4 : size === 'md' ? 5 : 6}
      h={size === 'sm' ? 4 : size === 'md' ? 5 : 6}
      justifyContent="center"
      alignItems="center"
    >
      <Text
        color="white"
        fontSize={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
        fontWeight="bold"
      >
        {displayCount}
      </Text>
    </Badge>
  );
};

export default NotificationBadge;
