import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Icon, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AddIcon from '../components/AddIcon/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import CreateUpdateUserScreen from '../screens/CreateUpdateUser/CreateUpdateUserScreen';
import UsersScreen from '../screens/Users/UsersScreen';
import { MainStackParamList } from '../types';
import { enterpriseStyles } from '../utils/EnterpriseStyles';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function UsersStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  const EnterpriseAddButton = ({ onPress }: { onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      mr={2}
      p={2}
      borderRadius="md"
      bg="primary.500"
      _pressed={{
        bg: 'primary.600'
      }}
    >
      <Icon
        as={MaterialIcons}
        name="add"
        size="5"
        color="white"
      />
    </Pressable>
  );

  return (
    <Stack.Navigator 
      initialRouteName="Users"
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
        name="Users"
        component={UsersScreen}
        options={({ navigation }) => ({
          title: t('AbpIdentity:Users'),
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
          headerRight: () => <EnterpriseAddButton onPress={() => navigation.navigate('CreateUpdateUser')} />,
        })}
      />
      <Stack.Screen
        name="CreateUpdateUser"
        component={CreateUpdateUserScreen}
        options={({ route }) => ({
          title: t(route.params?.userId ? 'AbpIdentity:Edit' : 'AbpIdentity:NewUser'),
        })}
      />
    </Stack.Navigator>
  );
}
