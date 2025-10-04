import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import SignalRService from '../services/SignalRService';
import { 
  connectSignalR, 
  disconnectSignalR, 
  signalRConnected, 
  receiveNotification 
} from '../store/actions/notificationActions';

export const useSignalR = () => {
  const dispatch = useDispatch();

  const initializeSignalR = useCallback(() => {
    // Set up SignalR callbacks
    SignalRService.setCallbacks({
      onNotificationReceived: (notification) => {
        dispatch(receiveNotification(notification));
      },
      onConnectionStateChanged: (connected) => {
        dispatch(signalRConnected(connected));
      },
      onError: (error) => {
        console.error('SignalR Error:', error);
        dispatch(signalRConnected(false));
      }
    });

    // Connect to SignalR
    dispatch(connectSignalR());
  }, [dispatch]);

  const disconnectFromSignalR = useCallback(() => {
    dispatch(disconnectSignalR());
  }, [dispatch]);

  const updateSignalRToken = useCallback(async () => {
    await SignalRService.updateToken();
  }, []);

  useEffect(() => {
    initializeSignalR();

    // Cleanup on unmount
    return () => {
      disconnectFromSignalR();
    };
  }, [initializeSignalR, disconnectFromSignalR]);

  return {
    initializeSignalR,
    disconnectFromSignalR,
    updateSignalRToken
  };
};
