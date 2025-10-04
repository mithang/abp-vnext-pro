import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, HStack, VStack, Badge, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { NotificationMessage } from '../services/SignalRService';

interface NotificationItemProps {
  notification: NotificationMessage;
  onPress: (notification: NotificationMessage) => void;
  onMarkAsRead?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  onMarkAsRead
}) => {
  const getMessageLevelColor = (level: number) => {
    switch (level) {
      case 10: return 'warning.500'; // Warning - Yellow
      case 20: return 'success.500'; // Information - Green
      case 30: return 'error.500';   // Error - Red
      default: return 'info.500';
    }
  };

  const getMessageLevelIcon = (level: number) => {
    switch (level) {
      case 10: return 'warning';
      case 20: return 'information-circle';
      case 30: return 'alert-circle';
      default: return 'information-circle';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(notification)}>
      <Box
        bg={notification.read ? 'white' : 'coolGray.50'}
        borderWidth={1}
        borderColor="coolGray.200"
        borderRadius="md"
        p={4}
        mb={2}
        shadow={1}
      >
        <HStack space={3} alignItems="flex-start">
          <Icon
            as={Ionicons}
            name={getMessageLevelIcon(notification.messageLevel)}
            size="md"
            color={getMessageLevelColor(notification.messageLevel)}
          />
          
          <VStack flex={1} space={1}>
            <HStack justifyContent="space-between" alignItems="flex-start">
              <Text
                fontSize="md"
                fontWeight={notification.read ? 'normal' : 'bold'}
                color="coolGray.800"
                flex={1}
                numberOfLines={2}
              >
                {notification.title}
              </Text>
              
              {!notification.read && (
                <Box w={2} h={2} bg="blue.500" borderRadius="full" ml={2} />
              )}
            </HStack>
            
            <Text
              fontSize="sm"
              color="coolGray.600"
              numberOfLines={3}
            >
              {notification.content}
            </Text>
            
            <HStack justifyContent="space-between" alignItems="center" mt={2}>
              <HStack space={2} alignItems="center">
                <Badge
                  colorScheme={
                    notification.messageLevel === 10 ? 'warning' :
                    notification.messageLevel === 20 ? 'success' : 'error'
                  }
                  variant="subtle"
                  borderRadius="md"
                >
                  {notification.messageLevelName}
                </Badge>
                
                <Text fontSize="xs" color="coolGray.500">
                  From: {notification.senderUserName}
                </Text>
              </HStack>
              
              <VStack alignItems="flex-end">
                <Text fontSize="xs" color="coolGray.500">
                  {formatDate(notification.creationTime)}
                </Text>
                
                {notification.read && notification.readTime && (
                  <Text fontSize="xs" color="success.500">
                    Read
                  </Text>
                )}
              </VStack>
            </HStack>
          </VStack>
          
          {!notification.read && onMarkAsRead && (
            <TouchableOpacity
              onPress={() => onMarkAsRead(notification.id)}
              style={styles.markReadButton}
            >
              <Icon
                as={Ionicons}
                name="checkmark-circle"
                size="sm"
                color="success.500"
              />
            </TouchableOpacity>
          )}
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  markReadButton: {
    padding: 4,
  },
});

export default NotificationItem;
