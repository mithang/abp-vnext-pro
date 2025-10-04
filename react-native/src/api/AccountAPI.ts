import api from './API';
import { getEnvVars } from '../../Environment';
import { LoginRequest, LoginResponse, LogoutRequest, Tenant } from '../types';

const { oAuthConfig } = getEnvVars();

const getLoginData = (username: string, password: string): string => {
  const formData: Record<string, string> = {
    grant_type: 'password',
    scope: oAuthConfig.scope,
    username: username,
    password: password,
    client_id: oAuthConfig.clientId,
  };

  if ((oAuthConfig as any).clientSecret)
    formData['client_secret'] = (oAuthConfig as any).clientSecret;

  return Object.entries(formData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};

export const login = ({ username, password }: LoginRequest): Promise<LoginResponse> =>
  api({
    method: 'POST',
    url: 'api/app/account/login',
    headers: { 'Content-Type': 'application/json' },
    data: {
      name: username,
      password: password
    },
    baseURL: oAuthConfig.issuer,
  }).then(({ data }) => data);

export const Logout = (
  input: LogoutRequest = { client_id: '', token: '', token_type_hint: '' },
): Promise<any> => {
  if (!input.token_type_hint) {
    input.token_type_hint = 'access_token';
  }

  const _data = Object.entries(input)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return api({
    method: 'POST',
    url: '/connect/revocation',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: _data,
    baseURL: oAuthConfig.issuer,
  }).then(({ data }) => data);
};

export const getTenant = (tenantName: string): Promise<Tenant> =>
  api({
    method: 'GET',
    url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`,
  }).then(({ data }) => data);

export const getTenantById = (tenantId: string): Promise<Tenant> =>
  api({
    method: 'GET',
    url: `/api/abp/multi-tenancy/tenants/by-id/${tenantId}`,
  }).then(({ data }) => data);
