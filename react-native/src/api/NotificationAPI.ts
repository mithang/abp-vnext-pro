import axiosInstance from './API';
import { NotificationMessage } from '../services/SignalRService';

export interface PagingNotificationInput {
  skipCount?: number;
  maxResultCount?: number;
  title?: string;
  content?: string;
  messageType?: number;
  messageLevel?: number;
  read?: boolean;
}

export interface CreateNotificationInput {
  title: string;
  content: string;
  messageLevel: number;
  receiveUserId: string;
  receiveUserName: string;
}

export interface SetReadInput {
  id: string;
}

export interface NotificationPagedResult {
  items: NotificationMessage[];
  totalCount: number;
}

export interface User {
  id: string;
  userName: string;
  name: string;
  email: string;
}

export interface UserListResult {
  items: User[];
  totalCount: number;
}

class NotificationAPI {
  private baseUrl = '/api/app/notification';

  async getNotifications(params: PagingNotificationInput): Promise<NotificationPagedResult> {
    const response = await axiosInstance.get(`${this.baseUrl}/notification-page`, {
      params
    });
    return response.data;
  }

  async markAsRead(input: SetReadInput): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/read`, input);
  }

  async sendCommonInformationMessage(input: CreateNotificationInput): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/send-common-information-message`, input);
  }

  async sendCommonWarningMessage(input: CreateNotificationInput): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/send-common-warning-message`, input);
  }

  async sendCommonErrorMessage(input: CreateNotificationInput): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/send-common-error-message`, input);
  }

  async sendBroadCastInformationMessage(input: Omit<CreateNotificationInput, 'receiveUserId' | 'receiveUserName'>): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/send-broad-cast-information-message`, input);
  }

  async sendBroadCastWarningMessage(input: Omit<CreateNotificationInput, 'receiveUserId' | 'receiveUserName'>): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/send-broad-cast-warning-message`, input);
  }

  async sendBroadCastErrorMessage(input: Omit<CreateNotificationInput, 'receiveUserId' | 'receiveUserName'>): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/send-broad-cast-error-message`, input);
  }

  async getUserList(params: { skipCount?: number; maxResultCount?: number }): Promise<UserListResult> {
    const response = await axiosInstance.get('/api/identity/users', {
      params
    });
    return response.data;
  }
}

export default new NotificationAPI();
