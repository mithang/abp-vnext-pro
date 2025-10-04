# Notification System Integration with SignalR

This document describes the implementation of real-time notifications in the React Native mobile app using SignalR integration.

## Overview

The notification system provides:
- Real-time notification delivery via SignalR
- Notification management (create, read, mark as read)
- Mobile-optimized UI components
- Redux state management
- Unread notification badges

## Architecture

### Core Components

1. **SignalR Service** (`src/services/SignalRService.ts`)
   - Manages SignalR connection lifecycle
   - Handles real-time message reception
   - Automatic reconnection with token refresh

2. **Notification API** (`src/api/NotificationAPI.ts`)
   - REST API integration for CRUD operations
   - User management for notification recipients
   - Support for different message levels (Warning, Information, Error)

3. **Redux Integration**
   - **Actions**: `src/store/actions/notificationActions.ts`
   - **Reducer**: `src/store/reducers/notificationReducer.ts`
   - **Saga**: `src/store/sagas/notificationSaga.ts`
   - **Selectors**: `src/store/selectors/notificationSelectors.ts`

4. **UI Components**
   - **NotificationItem**: Individual notification display
   - **NotificationBadge**: Unread count indicator
   - **NotificationScreen**: Main notification list
   - **CreateNotificationScreen**: Send new notifications

### File Structure

```
src/
├── services/
│   └── SignalRService.ts           # SignalR connection management
├── api/
│   └── NotificationAPI.ts          # REST API integration
├── store/
│   ├── actions/
│   │   └── notificationActions.ts  # Redux actions
│   ├── reducers/
│   │   └── notificationReducer.ts  # State management
│   ├── sagas/
│   │   └── notificationSaga.ts     # Side effects handling
│   └── selectors/
│       └── notificationSelectors.ts # State selectors
├── components/
│   ├── NotificationItem.tsx        # Individual notification
│   ├── NotificationBadge.tsx       # Unread badge
│   └── AppInitializer.tsx          # SignalR initialization
├── screens/
│   ├── NotificationScreen.tsx      # Main notification list
│   └── CreateNotificationScreen.tsx # Send notifications
├── navigators/
│   └── NotificationNavigator.tsx   # Navigation setup
└── hooks/
    └── useSignalR.ts              # SignalR React hook
```

## Features

### Real-time Notifications
- Automatic connection to SignalR hub
- Real-time message reception
- Connection status monitoring
- Automatic reconnection with token refresh

### Notification Management
- View all notifications with pagination
- Mark notifications as read/unread
- Filter by message level and read status
- Search notifications by title/content
- Send notifications to specific users

### Mobile UI Features
- Pull-to-refresh functionality
- Infinite scroll loading
- Unread notification badges
- Message level color coding
- Responsive mobile design

### Message Levels
- **Warning (10)**: Yellow indicator
- **Information (20)**: Green indicator  
- **Error (30)**: Red indicator

## Usage

### Basic Integration

1. **Initialize SignalR in your app**:
```tsx
import AppInitializer from './src/components/AppInitializer';

function App() {
  return (
    <AppInitializer>
      {/* Your app content */}
    </AppInitializer>
  );
}
```

2. **Access notification state**:
```tsx
import { useSelector } from 'react-redux';
import { selectNotifications, selectUnreadCount } from './src/store/selectors/notificationSelectors';

function MyComponent() {
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  
  return (
    <View>
      <Text>Unread: {unreadCount}</Text>
      {/* Render notifications */}
    </View>
  );
}
```

3. **Send notifications**:
```tsx
import { useDispatch } from 'react-redux';
import { sendNotification } from './src/store/actions/notificationActions';

function SendNotification() {
  const dispatch = useDispatch();
  
  const handleSend = () => {
    dispatch(sendNotification({
      title: 'Test Notification',
      content: 'This is a test message',
      messageLevel: 20, // Information
      receiveUserId: 'user-id',
      receiveUserName: 'username'
    }));
  };
  
  return <Button onPress={handleSend}>Send</Button>;
}
```

## Configuration

### Environment Setup

Ensure your environment configuration includes the SignalR hub URL:

```typescript
// Environment.ts
export const getEnvVars = () => ({
  apiUrl: 'http://localhost:44315', // Your API base URL
  // SignalR will connect to: {apiUrl}/signalr-hubs/notifications
});
```

### Required Dependencies

The following packages are required:
- `@microsoft/signalr`: SignalR client
- `@react-native-async-storage/async-storage`: Token storage
- `@reduxjs/toolkit`: State management
- `redux-saga`: Side effects
- `native-base`: UI components

## API Endpoints

The notification system integrates with these backend endpoints:

- `GET /api/app/notification/notification-page` - Get notifications
- `POST /api/app/notification/read` - Mark as read
- `POST /api/app/notification/send-common-information-message` - Send info
- `POST /api/app/notification/send-common-warning-message` - Send warning
- `POST /api/app/notification/send-common-error-message` - Send error
- `GET /api/app/users/list` - Get user list

## SignalR Hub

The app connects to the SignalR hub at `/signalr-hubs/notifications` and listens for:
- `ReceiveNotification`: New notification events

## Troubleshooting

### Connection Issues
1. Verify the API URL is correct
2. Check authentication token is valid
3. Ensure SignalR hub is running on the backend
4. Check network connectivity

### State Management
1. Verify Redux store includes notification reducer
2. Check saga is properly registered
3. Ensure selectors are imported correctly

### UI Issues
1. Check Native Base theme is properly configured
2. Verify navigation is set up correctly
3. Ensure permissions are granted for notifications

## Backend Integration

This implementation is designed to work with ABP vNext Pro's notification system. Ensure your backend has:

1. **SignalR Hub** configured at `/signalr-hubs/notifications`
2. **Notification Service** with the required API endpoints
3. **Authentication** properly configured for SignalR
4. **CORS** settings allowing your mobile app domain

## Security Considerations

- Authentication tokens are stored securely using AsyncStorage
- SignalR connections use bearer token authentication
- API calls include proper authorization headers
- Token refresh is handled automatically

## Performance Optimizations

- Pagination for large notification lists
- Lazy loading with infinite scroll
- Optimized Redux selectors with reselect
- Connection pooling and automatic reconnection
- Debounced search functionality
