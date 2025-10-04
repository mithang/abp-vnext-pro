import { NotificationMessage } from '../services/SignalRService';

export const createMockNotification = (overrides?: Partial<NotificationMessage>): NotificationMessage => ({
  id: `mock-${Date.now()}`,
  title: 'Test Notification',
  content: 'This is a test notification to verify the system is working',
  messageLevel: 20,
  messageLevelName: 'Information',
  senderUserName: 'System',
  receiveUserName: 'Current User',
  read: false,
  creationTime: new Date().toISOString(),
  ...overrides
});

export const createMockNotifications = (count: number = 5): NotificationMessage[] => {
  const notifications: NotificationMessage[] = [];
  const levels = [
    { level: 10, name: 'Warning' },
    { level: 20, name: 'Information' },
    { level: 30, name: 'Error' }
  ];

  for (let i = 0; i < count; i++) {
    const levelInfo = levels[i % levels.length];
    notifications.push(createMockNotification({
      id: `mock-${i}`,
      title: `Test Notification ${i + 1}`,
      content: `This is test notification number ${i + 1} with ${levelInfo.name.toLowerCase()} level`,
      messageLevel: levelInfo.level,
      messageLevelName: levelInfo.name,
      read: i % 3 === 0, // Some notifications are read
      readTime: i % 3 === 0 ? new Date().toISOString() : undefined,
      creationTime: new Date(Date.now() - (i * 60000)).toISOString() // Stagger creation times
    }));
  }

  return notifications;
};
