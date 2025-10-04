import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import i18n from 'i18n-js';
import { Box, HStack, Icon, Pressable, Text, VStack, Heading, Divider, Badge, Avatar } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { withPermission } from '../../hocs/PermissionHOC';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';
import { selectUnreadCount } from '../../store/selectors/notificationSelectors';
import NotificationBadge from '../NotificationBadge';

interface Screen {
  label: string;
  iconName: string;
  requiredPolicy?: string;
}

interface DrawerState {
  routeNames: string[];
  index: number;
}

interface DrawerContentProps {
  navigation: {
    navigate: (screen: string) => void;
    closeDrawer: () => void;
  };
  state: DrawerState;
}

const screens: Record<string, Screen> = {
  HomeStack: { label: 'Menu:Home', iconName: 'dashboard' },
  NotificationStack: { label: 'Notifications', iconName: 'notifications' },
  UsersStack: {
    label: 'AbpIdentity:Users',
    iconName: 'people',
    requiredPolicy: 'AbpIdentity.Users',
  },
  TenantsStack: {
    label: 'AbpTenantManagement:Tenants',
    iconName: 'business',
    requiredPolicy: 'AbpTenantManagement.Tenants',
  },
  ThemeStack: { label: 'Theme:Settings', iconName: 'palette' },
  SettingsStack: { label: 'AbpSettingManagement:Settings', iconName: 'settings' },
};

const PressableWithPermission = withPermission(Pressable);

function DrawerContent({
  navigation,
  state: { routeNames, index: currentScreenIndex },
}: DrawerContentProps) {
  const unreadCount = useSelector(selectUnreadCount);
  
  const navigate = (screen: string) => {
    navigation.navigate(screen);
    navigation.closeDrawer();
  };

  return (
    <Box flex={1} bg="gray.50">
      <SafeAreaView
        style={styles.container}
        edges={['top']}
      >
        {/* Header Section */}
        <VStack space={4} p={6} bg="white" shadow={2}>
          <VStack space={3} alignItems="center">
            <Avatar
              size="lg"
              bg="primary.500"
              source={require('../../../assets/logo.png')}
            >
              <Icon as={MaterialIcons} name="business" size="lg" color="white" />
            </Avatar>
            <VStack space={1} alignItems="center">
              <Heading size="md" color="gray.800">
                Enterprise Portal
              </Heading>
              <Badge colorScheme="primary" variant="subtle" size="sm">
                v{Constants.expoConfig?.version}
              </Badge>
            </VStack>
          </VStack>
        </VStack>
        
        <Divider />
        
        {/* Navigation Menu */}
        <VStack flex={1} space={1} p={4}>
          <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={2} ml={2}>
            MAIN MENU
          </Text>
          {routeNames.map((name) => {
            const isActive = name === routeNames[currentScreenIndex];
            return (
              <PressableWithPermission
                 key={name}
                 policyKey={screens[name].requiredPolicy}
                 onPress={() => navigate(name)}
               >
                 {({ isPressed }: { isPressed: boolean }) => (
                  <Box
                    bg={isActive ? 'primary.500' : isPressed ? 'gray.100' : 'transparent'}
                    borderRadius="lg"
                    p={3}
                    mx={1}
                    mb={1}
                  >
                    <HStack alignItems="center" space={3}>
                      <Box
                        p={2}
                        borderRadius="md"
                        bg={isActive ? 'primary.600' : 'gray.100'}
                      >
                        <Icon
                          as={MaterialIcons}
                          name={screens[name].iconName}
                          size="sm"
                          color={isActive ? 'white' : 'gray.600'}
                        />
                      </Box>
                      <Text
                        fontSize="md"
                        fontWeight={isActive ? 'semibold' : 'medium'}
                        color={isActive ? 'white' : 'gray.700'}
                        flex={1}
                      >
                        {i18n.t(screens[name].label)}
                      </Text>
                      {name === 'NotificationStack' && unreadCount > 0 && (
                        <Box position="relative">
                          <NotificationBadge count={unreadCount} size="sm" />
                        </Box>
                      )}
                      {isActive && (
                        <Icon
                          as={MaterialIcons}
                          name="chevron-right"
                          size="sm"
                          color="white"
                        />
                      )}
                    </HStack>
                  </Box>
                )}
              </PressableWithPermission>
            );
          })}
        </VStack>
        
        <Divider />
        
        {/* Footer Section */}
        <Box p={4} bg="white">
          <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xs" color="gray.500">
                © 2024 Solution
              </Text>
              <Badge colorScheme="green" variant="subtle" size="xs">
                Online
              </Badge>
            </HStack>
            <Text fontSize="xs" color="gray.400" textAlign="center">
              Enterprise Management System
            </Text>
          </VStack>
        </Box>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default DrawerContent;