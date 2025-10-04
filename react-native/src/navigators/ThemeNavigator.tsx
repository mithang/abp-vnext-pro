import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSettingsScreen from '../screens/ThemeSettings/ThemeSettingsScreen';
import { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function ThemeStackNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator 
      initialRouteName="ThemeSettings"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: theme.colors.text,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <Stack.Screen
        name="ThemeSettings"
        component={ThemeSettingsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
          title: '视觉设置',
        })}
      />
    </Stack.Navigator>
  );
}
