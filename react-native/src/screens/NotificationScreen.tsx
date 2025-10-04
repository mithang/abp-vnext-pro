import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl, Alert } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  FlatList,
  Button,
  Select,
  Input,
  Icon,
  Spinner,
  Center,
  useToast
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import NotificationItem from '../components/NotificationItem';
import NotificationBadge from '../components/NotificationBadge';
import { NotificationMessage } from '../services/SignalRService';
import {
  fetchNotifications,
  markNotificationAsRead,
  setNotificationFilter,
  connectSignalR
} from '../store/actions/notificationActions';
import {
  selectNotifications,
  selectIsLoading,
  selectUnreadCount,
  selectNotificationError,
  selectIsSignalRConnected,
  selectTotalCount,
  selectNotificationFilter
} from '../store/selectors/notificationSelectors';

const NotificationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  
  const notifications = useSelector(selectNotifications);
  const isLoading = useSelector(selectIsLoading);
  const unreadCount = useSelector(selectUnreadCount);
  const error = useSelector(selectNotificationError);
  const isConnected = useSelector(selectIsSignalRConnected);
  const totalCount = useSelector(selectTotalCount);
  const filter = useSelector(selectNotificationFilter);

  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedReadStatus, setSelectedReadStatus] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  // Initialize SignalR connection and fetch notifications
  useFocusEffect(
    useCallback(() => {
      if (!isConnected) {
        dispatch(connectSignalR());
      }
      loadNotifications();
    }, [dispatch, isConnected])
  );

  const loadNotifications = useCallback(() => {
    const filterParams = {
      ...filter,
      title: searchText || undefined,
      messageLevel: selectedLevel ? parseInt(selectedLevel) : undefined,
      read: selectedReadStatus ? selectedReadStatus === 'true' : undefined,
    };
    dispatch(fetchNotifications(filterParams));
  }, [dispatch, filter, searchText, selectedLevel, selectedReadStatus]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    loadNotifications();
    setRefreshing(false);
  }, [loadNotifications]);

  const handleSearch = useCallback(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleNotificationPress = useCallback((notification: NotificationMessage) => {
    Alert.alert(
      notification.title,
      notification.content,
      [
        {
          text: 'Close',
          style: 'cancel'
        },
        ...(notification.read ? [] : [{
          text: 'Mark as Read',
          onPress: () => handleMarkAsRead(notification.id)
        }])
      ]
    );
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    dispatch(markNotificationAsRead({ id }));
    toast.show({
      description: 'Notification marked as read'
    });
  }, [dispatch, toast]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && notifications.length < totalCount) {
      const newFilter = {
        ...filter,
        skipCount: notifications.length
      };
      dispatch(setNotificationFilter(newFilter));
      dispatch(fetchNotifications(newFilter));
    }
  }, [dispatch, filter, isLoading, notifications.length, totalCount]);

  const renderNotificationItem = ({ item }: { item: NotificationMessage }) => (
    <NotificationItem
      notification={item}
      onPress={handleNotificationPress}
      onMarkAsRead={handleMarkAsRead}
    />
  );

  const renderHeader = () => (
    <VStack space={4} mb={4}>
      {/* Connection Status */}
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space={2}>
          <Icon
            as={Ionicons}
            name={isConnected ? 'wifi' : 'wifi-off'}
            color={isConnected ? 'success.500' : 'error.500'}
            size="sm"
          />
          <Text fontSize="sm" color={isConnected ? 'success.500' : 'error.500'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </HStack>
        
        <HStack alignItems="center" space={2}>
          <Icon as={Ionicons} name="notifications" size="sm" />
          <NotificationBadge count={unreadCount} />
          <Text fontSize="sm" color="coolGray.600">
            {unreadCount} unread
          </Text>
        </HStack>
      </HStack>

      {/* Search and Filters */}
      <VStack space={3}>
        <HStack space={2}>
          <Input
            flex={1}
            placeholder="Search notifications..."
            value={searchText}
            onChangeText={setSearchText}
            InputLeftElement={
              <Icon as={Ionicons} name="search" size="sm" ml={2} color="coolGray.400" />
            }
          />
          <Button onPress={handleSearch} size="sm">
            Search
          </Button>
        </HStack>

        <HStack space={2}>
          <Select
            flex={1}
            placeholder="Message Level"
            selectedValue={selectedLevel}
            onValueChange={setSelectedLevel}
          >
            <Select.Item label="All Levels" value="" />
            <Select.Item label="Warning" value="10" />
            <Select.Item label="Information" value="20" />
            <Select.Item label="Error" value="30" />
          </Select>

          <Select
            flex={1}
            placeholder="Read Status"
            selectedValue={selectedReadStatus}
            onValueChange={setSelectedReadStatus}
          >
            <Select.Item label="All" value="" />
            <Select.Item label="Read" value="true" />
            <Select.Item label="Unread" value="false" />
          </Select>
        </HStack>
      </VStack>

      {/* Error Display */}
      {error && (
        <Box bg="error.100" p={3} borderRadius="md">
          <Text color="error.700">{error}</Text>
        </Box>
      )}
    </VStack>
  );

  const renderFooter = () => {
    if (!isLoading || notifications.length === 0) return null;
    
    return (
      <Center py={4}>
        <Spinner size="sm" />
        <Text fontSize="sm" color="coolGray.500" mt={2}>
          Loading more notifications...
        </Text>
      </Center>
    );
  };

  const renderEmpty = () => (
    <Center py={8}>
      <Icon as={Ionicons} name="notifications-off" size="xl" color="coolGray.400" />
      <Text fontSize="lg" color="coolGray.500" mt={4}>
        No notifications found
      </Text>
      <Text fontSize="sm" color="coolGray.400" textAlign="center" mt={2}>
        You're all caught up! New notifications will appear here.
      </Text>
    </Center>
  );

  return (
    <Box flex={1} bg="white" safeArea>
      <VStack flex={1} px={4} py={2}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Notifications
        </Text>
        
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={!isLoading ? renderEmpty : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </Box>
  );
};

export default NotificationScreen;
