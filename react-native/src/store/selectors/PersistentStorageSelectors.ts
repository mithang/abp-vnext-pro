import { createSelector } from 'reselect';
import { RootState, PersistentStorageState } from '../../types';

const getPersistentStorage = (state: RootState): PersistentStorageState => state.persistentStorage;

export function createTokenSelector() {
  return createSelector([getPersistentStorage], (persistentStorage: PersistentStorageState): Record<string, any> => persistentStorage.token);
}

export function createTenantSelector() {
  return createSelector([getPersistentStorage], (persistentStorage: PersistentStorageState): Record<string, any> => persistentStorage.tenant);
}
