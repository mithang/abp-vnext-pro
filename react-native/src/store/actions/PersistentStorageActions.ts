import { createAction } from '@reduxjs/toolkit';

const setToken = createAction<Record<string, any>>('persistentStorage/setToken');

const setLanguage = createAction<string | null>('persistentStorage/setLanguage');

const setTenant = createAction<Record<string, any>>('persistentStorage/setTenant');

const clearAll = createAction('persistentStorage/clearAll');

export default {
  setToken,
  setLanguage,
  setTenant,
  clearAll,
};

export type PersistentStorageActions = 
  | ReturnType<typeof setToken>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof setTenant>
  | ReturnType<typeof clearAll>;
