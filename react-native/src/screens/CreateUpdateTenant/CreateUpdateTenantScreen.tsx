import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  createTenant,
  getTenantById,
  removeTenant,
  updateTenant
} from '../../api/TenantManagementAPI';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import CreateUpdateTenantForm from './CreateUpdateTenantForm';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Tenant, CreateUpdateTenantRequest } from '../../types';

interface TenantFormData {
  id?: string;
  name: string;
  adminEmailAddress?: string;
  adminPassword?: string;
  lockoutEnabled?: boolean;
  twoFactorEnabled?: boolean;
  isActive?: boolean;
}

interface RouteParams {
  tenantId?: string;
}

interface CreateUpdateTenantScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: RouteParams }, 'params'>;
  startLoading: (params: { key: string }) => void;
  stopLoading: (params: { key: string }) => void;
  loading?: any;
}

function CreateUpdateTenantScreen({ navigation, route, startLoading, stopLoading }: CreateUpdateTenantScreenProps) {
  const [tenant, setTenant] = useState<Tenant | undefined>();
  const tenantId = route.params?.tenantId;

  const remove = () => {
    startLoading({ key: 'removeTenant' });
    removeTenant(tenantId!)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'removeTenant' }));
  };

  useFocusEffect(
    useCallback(() => {
      if (tenantId) {
        getTenantById(tenantId).then((data: Tenant) => setTenant(data));
      }
    }, [tenantId]),
  );

  const submit = (data: TenantFormData) => {
    startLoading({ key: 'saveTenant' });
    let request: Promise<any>;
    const requestData: CreateUpdateTenantRequest = {
      name: data.name,
      isActive: data.isActive ?? true
    };
    
    if (data.id) {
      request = updateTenant(requestData, tenantId!);
    } else {
      request = createTenant(requestData);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveTenant' }));
  };

  const renderForm = () => (
    <CreateUpdateTenantForm
      editingTenant={tenant}
      submit={submit}
      remove={remove}
    />
  );

  if (tenantId && tenant) {
    return renderForm();
  }

  if (!tenantId) {
    return renderForm();
  }

  return null;
}

export default connectToRedux({
  component: CreateUpdateTenantScreen,
  stateProps: (state: any) => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});