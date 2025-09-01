import api from './API';
import { Tenant, CreateUpdateTenantRequest, PaginationParams, PaginatedResponse } from '../types';

export function getTenants(params: PaginationParams = {}): Promise<PaginatedResponse<Tenant>> {
  return api.get('/api/multi-tenancy/tenants', { params }).then(({ data }) => data);
}

export function createTenant(body: CreateUpdateTenantRequest): Promise<Tenant> {
  return api.post('/api/multi-tenancy/tenants', body).then(({ data }) => data);
}

export function getTenantById(id: string): Promise<Tenant> {
  return api.get(`/api/multi-tenancy/tenants/${id}`).then(({ data }) => data);
}

export function updateTenant(body: CreateUpdateTenantRequest, id: string): Promise<Tenant> {
  return api.put(`/api/multi-tenancy/tenants/${id}`, body).then(({ data }) => data);
}

export function removeTenant(id: string): Promise<void> {
  return api.delete(`/api/multi-tenancy/tenants/${id}`).then(({ data }) => data);
}
