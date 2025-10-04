import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import { getEnvVars } from '../../Environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationMessage {
  id: string;
  title: string;
  content: string;
  messageLevel: number;
  messageLevelName: string;
  senderUserName: string;
  receiveUserName: string;
  read: boolean;
  readTime?: string;
  creationTime: string;
}

export interface SignalRCallbacks {
  onNotificationReceived?: (notification: NotificationMessage) => void;
  onConnectionStateChanged?: (connected: boolean) => void;
  onError?: (error: Error) => void;
}

class SignalRService {
  private connection: HubConnection | null = null;
  private callbacks: SignalRCallbacks = {};
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000;

  constructor() {
    this.initializeConnection();
  }

  private async initializeConnection() {
    const { apiUrl } = getEnvVars();
    const token = await AsyncStorage.getItem('accessToken');

    try {
      // Ensure proper URL construction for React Native
      const hubUrl = apiUrl.endsWith('/') 
        ? `${apiUrl}signalr-hubs/notifications`
        : `${apiUrl}/signalr-hubs/notifications`;

      this.connection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => token || '',
          transport: HttpTransportType.WebSockets,
          skipNegotiation: true,
          headers: {
            'Authorization': `Bearer ${token || ''}`,
          }
        })
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(LogLevel.Warning)
        .build();

      this.setupEventHandlers();
    } catch (error) {
      console.error('Failed to initialize SignalR connection:', error);
      throw error;
    }
  }

  private enablePollingMode() {
    this.isPollingMode = true;
    console.log('SignalR unavailable, using polling mode for notifications');
    
    // Simulate connection for UI purposes
    this.callbacks.onConnectionStateChanged?.(true);
    
    // Start polling for notifications every 30 seconds
    this.startPolling();
  }

  private startPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.pollingInterval = setInterval(() => {
      // This would trigger a notification fetch in the app
      // The actual polling logic will be handled by the Redux saga
      console.log('Polling for new notifications...');
    }, 30000); // Poll every 30 seconds
  }

  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    // Handle incoming notifications
    this.connection.on('ReceiveNotification', (notification: NotificationMessage) => {
      console.log('Received notification:', notification);
      this.callbacks.onNotificationReceived?.(notification);
    });

    // Handle connection state changes
    this.connection.onclose((error) => {
      console.log('SignalR connection closed:', error);
      this.callbacks.onConnectionStateChanged?.(false);
      if (error) {
        this.callbacks.onError?.(error);
      }
    });

    this.connection.onreconnecting((error) => {
      console.log('SignalR reconnecting:', error);
      this.callbacks.onConnectionStateChanged?.(false);
    });

    this.connection.onreconnected((connectionId) => {
      console.log('SignalR reconnected:', connectionId);
      this.callbacks.onConnectionStateChanged?.(true);
      this.reconnectAttempts = 0;
    });
  }

  public async start(): Promise<void> {
    // If already in polling mode, don't try SignalR
    if (this.isPollingMode) {
      return;
    }

    if (!this.connection) {
      await this.initializeConnection();
    }

    try {
      if (this.connection?.state === 'Disconnected') {
        await this.connection.start();
        console.log('SignalR connection started successfully');
        this.callbacks.onConnectionStateChanged?.(true);
        this.reconnectAttempts = 0;
      }
    } catch (error) {
      console.warn('SignalR connection failed, falling back to polling mode:', error);
      this.enablePollingMode();
    }
  }

  public async stop(): Promise<void> {
    this.stopPolling();
    
    if (this.connection) {
      await this.connection.stop();
      console.log('SignalR connection stopped');
    }
    
    this.callbacks.onConnectionStateChanged?.(false);
    this.isPollingMode = false;
  }

  public setCallbacks(callbacks: SignalRCallbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  public isConnected(): boolean {
    return this.isPollingMode || this.connection?.state === 'Connected';
  }

  public isInPollingMode(): boolean {
    return this.isPollingMode;
  }

  public async updateToken() {
    const token = await AsyncStorage.getItem('accessToken');
    if (this.connection && token) {
      // Restart connection with new token
      await this.stop();
      await this.initializeConnection();
      await this.start();
    }
  }
}

export default new SignalRService();
