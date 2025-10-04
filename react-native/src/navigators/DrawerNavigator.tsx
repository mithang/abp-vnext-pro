import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import HomeStackNavigator from './HomeNavigator';
import SettingsStackNavigator from './SettingsNavigator';
import TenantsStackNavigator from './TenantsNavigator';
import ThemeStackNavigator from './ThemeNavigator';
import UsersStackNavigator from './UsersNavigator';
import NotificationStackNavigator from './NotificationNavigator';
import { DrawerParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Drawer.Navigator 
      initialRouteName="HomeStack" 
      drawerContent={DrawerContent}
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
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          title: t('Menu:Home'),
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
        })}
      />
      <Drawer.Screen name="NotificationStack" component={NotificationStackNavigator} options={{ header: () => null }} />
      <Drawer.Screen name="UsersStack" component={UsersStackNavigator} options={{ header: () => null }} />
      <Drawer.Screen name="TenantsStack" component={TenantsStackNavigator} options={{ header: () => null }} />
      <Drawer.Screen name="ThemeStack" component={ThemeStackNavigator} options={{ header: () => null }} />
      <Drawer.Screen name="SettingsStack" component={SettingsStackNavigator} options={{ header: () => null }} />
    </Drawer.Navigator>
  );
}
