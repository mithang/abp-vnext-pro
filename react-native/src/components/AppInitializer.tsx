import React, { useEffect } from 'react';
import { useSignalR } from '../hooks/useSignalR';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  // Initialize SignalR when app starts
  useSignalR();

  return <>{children}</>;
};

export default AppInitializer;
