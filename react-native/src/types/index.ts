// Common Types and Interfaces

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  result?: T;
  error?: {
    message: string;
    details?: string;
    code?: string;
  };
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface PaginatedResponse<T> {
  totalCount: number;
  items: T[];
}

export interface PaginationParams {
  pageSize?: number;
  pageIndex?: number;
  sorting?: string;
  filter?: string;
}

// Redux Store Types
export interface RootState {
  loading: LoadingState;
  app: ReduxAppState;
  persistentStorage: PersistentStorageState;
  notification: import('../store/reducers/notificationReducer').NotificationState;
}

export interface LoadingState {
  activeLoadings: Record<string, any>;
  loading: boolean;
  opacity?: number;
}

export interface ReduxAppState {
  appConfig: ApplicationConfiguration;
}

export interface PersistentStorageState {
  token: Record<string, any>;
  language: string | null;
  tenant: Record<string, any>;
}

// Action Payload Types
export interface FetchAppConfigPayload {
  callback?: () => void;
  showLoading?: boolean;
}

export interface LogoutPayload {
  client_id?: string;
  token?: string;
  refresh_token?: string;
}

export interface LoadingActionPayload {
  key: string;
  opacity?: number;
}

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  userName: string;
  token: string;
  roles: string[];
}

export interface LogoutRequest {
  client_id?: string;
  token: string;
  token_type_hint?: string;
}

// User Types
export interface User {
  id: string;
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  isActive: boolean;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  concurrencyStamp?: string;
  creationTime: string;
  creatorId?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  extraProperties?: Record<string, any>;
}

export interface CreateUpdateUserRequest {
  userName: string;
  email: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  isActive: boolean;
  lockoutEnabled: boolean;
  password?: string;
  roleNames?: string[];
}

export interface UserRole {
  id: string;
  name: string;
  isDefault: boolean;
  isStatic: boolean;
  isPublic: boolean;
  concurrencyStamp?: string;
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  normalizedName: string;
  isActive: boolean;
  creationTime: string;
}

export interface Token {
  id: string;
  name: string;
  userName: string;
  token: string;
  roles: string[];
  expire_time?: number;
}

export interface CreateUpdateTenantRequest {
  name: string;
  isActive: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Settings: undefined;
  Users: undefined;
  Tenants: undefined;
  CreateUpdateUser: { userId?: string };
  CreateUpdateTenant: { tenantId?: string };
  ChangePassword: undefined;
  ManageProfile: undefined;
  ThemeSettings: undefined;
};

export type DrawerParamList = {
  HomeStack: undefined;
  TenantsStack: undefined;
  UsersStack: undefined;
  ThemeStack: undefined;
  SettingsStack: undefined;
  NotificationStack: undefined;
};

// Redux Types
export interface AppState {
  language: Language | null;
  currentUser: User | null;
  applicationConfiguration: ApplicationConfiguration | null;
  grantedPolicies: Record<string, boolean>;
}

// Removed duplicate PersistentStorageState - using the one defined above

// Application Configuration Types
export interface ApplicationConfiguration {
  localization: LocalizationConfiguration;
  auth: AuthConfiguration;
  setting: SettingConfiguration;
  currentUser: CurrentUser;
  features: Record<string, boolean>;
  multiTenancy: MultiTenancyConfiguration;
  currentTenant: CurrentTenant;
  timing: TimingConfiguration;
  clock: ClockConfiguration;
}

export interface LocalizationConfiguration {
  values: Record<string, Record<string, string>>;
  languages: Language[];
  currentCulture: Culture;
  defaultResourceName: string;
  languagesMap: Record<string, Language[]>;
  languageFilesMap: Record<string, string[]>;
}

export interface Language {
  cultureName: string;
  uiCultureName: string;
  displayName: string;
  flagIcon?: string;
}

export interface Culture {
  cultureName: string;
  name: string;
  displayName: string;
  englishName: string;
  threeLetterIsoLanguageName: string;
  twoLetterIsoLanguageName: string;
  isRightToLeft: boolean;
  dateTimeFormat: DateTimeFormatInfo;
  numberFormat: NumberFormatInfo;
}

export interface DateTimeFormatInfo {
  calendarAlgorithmType: string;
  dateTimeFormatLong: string;
  shortDatePattern: string;
  fullDateTimePattern: string;
  dateSeparator: string;
  shortTimePattern: string;
  longTimePattern: string;
}

export interface NumberFormatInfo {
  currencyDecimalDigits: number;
  currencyDecimalSeparator: string;
  currencyGroupSeparator: string;
  currencyGroupSizes: number[];
  currencyNegativePattern: number;
  currencyPositivePattern: number;
  currencySymbol: string;
  nanSymbol: string;
  nativeDigits: string[];
  negativeInfinitySymbol: string;
  negativeSign: string;
  numberDecimalDigits: number;
  numberDecimalSeparator: string;
  numberGroupSeparator: string;
  numberGroupSizes: number[];
  numberNegativePattern: number;
  perMilleSymbol: string;
  percentDecimalDigits: number;
  percentDecimalSeparator: string;
  percentGroupSeparator: string;
  percentGroupSizes: number[];
  percentNegativePattern: number;
  percentPositivePattern: number;
  percentSymbol: string;
  positiveInfinitySymbol: string;
  positiveSign: string;
}

export interface AuthConfiguration {
  grantedPolicies: Record<string, boolean>;
}

export interface SettingConfiguration {
  values: Record<string, string>;
}

export interface CurrentUser {
  isAuthenticated: boolean;
  id?: string;
  tenantId?: string;
  impersonatorUserId?: string;
  impersonatorTenantId?: string;
  impersonatorUserName?: string;
  impersonatorTenantName?: string;
  userName?: string;
  name?: string;
  surname?: string;
  email?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  roles: string[];
}

export interface MultiTenancyConfiguration {
  isEnabled: boolean;
}

export interface CurrentTenant {
  id?: string;
  name?: string;
  isAvailable: boolean;
}

export interface TimingConfiguration {
  timeZone: TimeZoneInfo;
}

export interface TimeZoneInfo {
  iana: IanaTimeZone;
  windows: WindowsTimeZone;
}

export interface IanaTimeZone {
  timeZoneName: string;
}

export interface WindowsTimeZone {
  timeZoneId: string;
}

export interface ClockConfiguration {
  kind: string;
}

// Form Types
export interface FormikProps<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: () => void;
  resetForm: () => void;
}

// Component Props Types
export interface DataListProps<T> {
  fetchFn: (params: PaginationParams) => Promise<PaginatedResponse<T>>;
  render: (item: T, index: number) => React.ReactElement;
  maxResultCount?: number;
  debounceTime?: number;
  navigation?: any;
}

export interface LoadingButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: string;
  size?: string;
  colorScheme?: string;
}

// Environment Types
export interface EnvironmentConfig {
  apiUrl: string;
  oAuthConfig: OAuthConfig;
  localization: LocalizationConfig;
}

export interface OAuthConfig {
  issuer: string;
  clientId: string;
  clientSecret?: string;
  scope: string;
}

export interface LocalizationConfig {
  defaultResourceName: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;