import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import NotificationScreen from '../screens/NotificationScreen';
import CreateNotificationScreen from '../screens/CreateNotificationScreen';
import NotificationBadge from '../components/NotificationBadge';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { selectUnreadCount } from '../store/selectors/notificationSelectors';

export type NotificationStackParamList = {
  NotificationList: undefined;
  CreateNotification: undefined;
};

const Stack = createNativeStackNavigator<NotificationStackParamList>();

export default function NotificationStackNavigator() {
  const unreadCount = useSelector(selectUnreadCount);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#212529',
        },
        headerTintColor: '#495057',
      }}
    >
      <Stack.Screen
        name="NotificationList"
        component={NotificationScreen}
        options={({ navigation }) => ({
          title: 'Notifications',
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateNotification')}
              style={{ position: 'relative', marginRight: 16 }}
            >
              <Icon
                as={Ionicons}
                name="add-circle"
                size="lg"
                color="blue.500"
              />
              {unreadCount > 0 && (
                <NotificationBadge count={unreadCount} size="sm" />
              )}
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateNotification"
        component={CreateNotificationScreen}
        options={{
          title: 'Send Notification',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
