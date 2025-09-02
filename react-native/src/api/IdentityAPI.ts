import api from './API';
import { User, UserRole, CreateUpdateUserRequest, PaginationParams, PaginatedResponse } from '../types';

export const getAllRoles = (): Promise<UserRole[]> => 
  api.get('/api/identity/roles/all').then(({ data }) => data.items);

export const getUserRoles = (id: string): Promise<UserRole[]> =>
  api.get(`/api/identity/users/${id}/roles`).then(({ data }) => data.items);

export const getUsers = (params: PaginationParams = { pageSize: 10, pageIndex: 1 }): Promise<PaginatedResponse<User>> =>
  api.post('/users/list',  params ).then(({ data }) => data);

export const getUserById = (id: string): Promise<User> => 
  api.get(`/api/identity/users/${id}`).then(({ data }) => data);

export const createUser = (body: CreateUpdateUserRequest): Promise<User> => 
  api.post('/api/identity/users', body).then(({ data }) => data);

export const updateUser = (body: CreateUpdateUserRequest, id: string): Promise<User> =>
  api.put(`/api/identity/users/${id}`, body).then(({ data }) => data);

export const removeUser = (id: string): Promise<void> => 
  api.delete(`/api/identity/users/${id}`);

export const getProfileDetail = (): Promise<User> => 
  api.post('/users/myprofile').then(({ data }) => data);

export const updateProfileDetail = (body: Partial<User>): Promise<User> =>
  api.put('/api/identity/users/my-profile', body).then(({ data }) => data);

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = (body: ChangePasswordRequest): Promise<void> =>
  api.post('/api/identity/users/my-profile/change-password', body).then(({ data }) => data);
