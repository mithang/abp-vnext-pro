import i18n from 'i18n-js';
import { Box, Button, FormControl, Input, Text } from 'native-base';
import React, { forwardRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { getTenant } from '../../api/AccountAPI';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import { createTenantSelector } from '../../store/selectors/PersistentStorageSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import { Tenant } from '../../types';

interface TenantBoxProps {
  tenant: Tenant;
  setTenant: (tenant: Tenant) => void;
  showTenantSelection: boolean;
  toggleTenantSelection: () => void;
  forwardedRef?: any;
}

function TenantBox({
  tenant = {} as Tenant,
  setTenant,
  showTenantSelection,
  toggleTenantSelection,
}: TenantBoxProps) {
  const [tenantName, setTenantName] = useState<string>(tenant.name || '');

  const findTenant = () => {
    if (!tenantName) {
      setTenant({} as Tenant);
      toggleTenantSelection();
      return;
    }

    getTenant(tenantName).then((response: any) => {
      const { success, ...data } = response;
      if (!success) {
        Alert.alert(
          i18n.t('AbpUi:Error'),
          i18n.t('AbpUiMultiTenancy:GivenTenantIsNotAvailable', {
            0: tenantName,
          }),
          [{ text: i18n.t('AbpUi:Ok') }]
        );
        return;
      }
      setTenant(data);
      toggleTenantSelection();
    });
  };

  return (
    <>
      <Box
        mb="5"
        px="4"
        w={{
          base: '100%',
        }}
        style={{ flexDirection: 'row' }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {i18n.t('AbpUiMultiTenancy:Tenant')}
          </Text>
          <Text style={styles.tenant}>
            {tenant.name
              ? tenant.name
              : i18n.t('AbpUiMultiTenancy:NotSelected')}
          </Text>
        </View>
        <Button
          style={{
            display: !showTenantSelection ? 'flex' : 'none',
          }}
          onPress={() => toggleTenantSelection()}
        >
            {i18n.t('AbpUiMultiTenancy:Switch')}
        </Button>
      </Box>
      {showTenantSelection ? (
        <Box
          px="3"
          w={{
            base: '100%',
          }}
        >
          <FormControl my="2" width={350}>
            <FormControl.Label>
              {i18n.t('AbpUiMultiTenancy:Name')}
            </FormControl.Label>
            <Input
              autoCapitalize="none"
              value={tenantName}
              onChangeText={setTenantName}
            />
          </FormControl>
          <Text style={styles.hint}>
            {i18n.t('AbpUiMultiTenancy:SwitchTenantHint')}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button
              style={styles.button}
              onPress={() => toggleTenantSelection()}
              variant="outline"
            >
              {i18n.t('AbpAccount:Cancel')}
            </Button>
            <Button style={styles.button} onPress={() => findTenant()}>
              {i18n.t('AbpAccount:Save')}
            </Button>
          </View>
        </Box>
      ) : null}
    </>
  );
}



const styles = StyleSheet.create({
  button: { marginTop: 20, width: '49%' },

  tenant: { color: '#777' },
  title: {
    marginRight: 10,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  hint: { color: '#bbb', textAlign: 'left' },
});

const Forwarded = forwardRef<any, any>((props: any, ref) => (
  <TenantBox {...props} forwardedRef={ref} />
));

export default connectToRedux({
  component: Forwarded,
  dispatchProps: {
    setTenant: PersistentStorageActions.setTenant,
  },
  stateProps: (state: any) => ({
    tenant: createTenantSelector()(state),
  }),
}) as any;