import { useEffect, useState } from 'react';
import { store } from '../store';
import { createGrantedPolicySelector } from '../store/selectors/AppSelectors';

export function usePermission(key?: string): boolean {
  const [permission, setPermission] = useState<boolean>(false);

  const state = store.getState();
  const policy = key ? createGrantedPolicySelector(key)(state) : true;

  useEffect(() => {
    setPermission(policy);
  }, [policy]);

  return permission;
}