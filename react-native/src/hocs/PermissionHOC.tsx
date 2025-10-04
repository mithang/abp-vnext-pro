import React, { forwardRef } from 'react';
import { usePermission } from '../hooks/UsePermission';

interface WithPermissionProps {
  policyKey?: string;
}

export function withPermission(
  Component: React.ComponentType<any>,
  policyKey?: string
) {
  const Forwarded = forwardRef<any, any>(
    (props, ref) => {
      const isGranted =
        policyKey || props.policyKey ? usePermission(policyKey || props.policyKey) : true;
      return isGranted ? <Component ref={ref} {...props} /> : null;
    }
  );

  return Forwarded;
}