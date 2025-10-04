import React from 'react';
import { Box, Heading, Text, HStack, VStack, Pressable } from 'native-base';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';

interface EnterpriseCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onPress?: () => void;
  headerAction?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: number;
}

export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  headerAction,
  variant = 'elevated',
  padding = 5,
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          bg: 'white',
          borderWidth: 1,
          borderColor: 'gray.200',
          borderRadius: 'lg',
        };
      case 'elevated':
        return {
          bg: 'white',
          borderRadius: 'lg',
          shadow: 2,
        };
      default:
        return {
          bg: 'white',
          borderRadius: 'lg',
        };
    }
  };

  const CardContent = (
    <Box {...getCardStyle()} p={padding}>
      {(title || subtitle || headerAction) && (
        <VStack space={2} mb={title || subtitle ? 4 : 0}>
          {(title || headerAction) && (
            <HStack justifyContent="space-between" alignItems="center">
              {title && (
                <Heading size="md" color="gray.800">
                  {title}
                </Heading>
              )}
              {headerAction}
            </HStack>
          )}
          {subtitle && (
            <Text color="gray.500" fontSize="sm">
              {subtitle}
            </Text>
          )}
        </VStack>
      )}
      {children}
    </Box>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} _pressed={{ opacity: 0.8 }}>
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
};

export default EnterpriseCard;