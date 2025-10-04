import { createNativeStackNavigator } from '@react-navigation/native-stack';
import i18n from 'i18n-js';
import React from 'react';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import ManageProfileScreen from '../screens/ManageProfile/ManageProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function SettingsStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator 
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#212529',
        },
        headerTintColor: '#495057',
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
          title: t('AbpSettingManagement:Settings'),
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: i18n.t('AbpUi:ChangePassword'),
        }}
      />
      <Stack.Screen
        name="ManageProfile"
        component={ManageProfileScreen}
        options={{
          title: i18n.t('AbpAccount:MyAccount'),
        }}
      />
    </Stack.Navigator>
  );
}
