import React from 'react';
import { changePassword } from '../../api/IdentityAPI';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import ChangePasswordForm from './ChangePasswordForm';
import { NavigationProp } from '@react-navigation/native';

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface ChangePasswordScreenProps {
  navigation: NavigationProp<any>;
  startLoading: (params: { key: string }) => void;
  stopLoading: (params: { key: string }) => void;
}

function ChangePasswordScreen({ navigation, startLoading, stopLoading }: ChangePasswordScreenProps) {
  const submit = (data: ChangePasswordData) => {
    startLoading({ key: 'changePassword' });

    changePassword(data)
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'changePassword' }));
  };

  return <ChangePasswordForm submit={submit} cancel={() => navigation.goBack()} />;
}

export default connectToRedux({
  component: ChangePasswordScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});