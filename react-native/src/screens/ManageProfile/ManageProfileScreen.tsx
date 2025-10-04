import React, { useState, useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { updateProfileDetail, getProfileDetail } from '../../api/IdentityAPI';
import ManageProfileForm from './ManageProfileForm';
import LoadingActions from '../../store/actions/LoadingActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { User } from '../../types';

interface ProfileFormData {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
}

interface ManageProfileScreenProps {
  navigation: NavigationProp<any>;
  startLoading: (params: { key: string }) => void;
  stopLoading: (params: { key: string }) => void;
}

function ManageProfileScreen({ navigation, startLoading, stopLoading }: ManageProfileScreenProps) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (!user) {
      startLoading({ key: 'manageProfile' });
      getProfileDetail()
        .then((data: User = {} as User) => setUser(data))
        .finally(() => stopLoading({ key: 'manageProfile' }));
    }
  });

  const submit = (data: ProfileFormData) => {
    startLoading({ key: 'manageProfile' });

    updateProfileDetail(data)
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'manageProfile' }));
  };

  const cancel = () => {
    navigation.goBack();
  };

  return (
    <>
      {user ? (
        <ManageProfileForm editingUser={user} submit={submit} cancel={cancel} />
      ) : null}
    </>
  );
}

export default connectToRedux({
  component: ManageProfileScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});