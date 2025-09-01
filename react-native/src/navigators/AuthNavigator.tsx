import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { LocalizationContext } from '../contexts/LocalizationContext';
import LoginScreen from '../screens/Login/LoginScreen';
import { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const {t} = useContext(LocalizationContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          title: t('AbpAccount:Login'),
        })}
      />
    </Stack.Navigator>
  );
}
