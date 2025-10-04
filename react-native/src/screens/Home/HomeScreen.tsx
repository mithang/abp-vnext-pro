import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Pressable,
  Badge,
  Progress,
  Divider,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'i18n-js';
import { EnterpriseLayout } from '../../components/EnterpriseLayout/EnterpriseLayout';
import { EnterpriseCard } from '../../components/EnterpriseCard/EnterpriseCard';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';

const HomeScreen = () => {
  const dashboardStats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: 'people',
      color: 'primary.500',
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: 'login',
      color: 'success.500',
    },
    {
      title: 'System Health',
      value: '98.5%',
      change: '-0.2%',
      changeType: 'negative',
      icon: 'health-and-safety',
      color: 'warning.500',
    },
    {
      title: 'Storage Used',
      value: '67%',
      change: '+3%',
      changeType: 'neutral',
      icon: 'storage',
      color: 'info.500',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'User Registration',
      user: 'john.doe@company.com',
      time: '2 minutes ago',
      type: 'success',
    },
    {
      id: 2,
      action: 'Password Reset',
      user: 'jane.smith@company.com',
      time: '15 minutes ago',
      type: 'warning',
    },
    {
      id: 3,
      action: 'Profile Updated',
      user: 'mike.wilson@company.com',
      time: '1 hour ago',
      type: 'info',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove users',
      icon: 'people',
      color: 'primary.500',
    },
    {
      title: 'System Settings',
      description: 'Configure application settings',
      icon: 'settings',
      color: 'secondary.500',
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      icon: 'analytics',
      color: 'success.500',
    },
    {
      title: 'Security',
      description: 'Manage security settings',
      icon: 'security',
      color: 'warning.500',
    },
  ];

  return (
    <EnterpriseLayout>
      <VStack space={6} p={4}>
        {/* Header Section */}
        <VStack space={2}>
          <Heading size="xl" color="gray.800">
            {i18n.t('Welcome')}
          </Heading>
          <Text color="gray.600" fontSize="md">
            {i18n.t('LongWelcomeMessage')}
          </Text>
        </VStack>

        {/* Dashboard Stats */}
        <VStack space={4}>
          <Heading size="md" color="gray.700">
            Dashboard Overview
          </Heading>
          <SimpleGrid columns={2} space={4}>
            {dashboardStats.map((stat, index) => (
              <EnterpriseCard key={index} variant="elevated">
                <VStack space={3}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name={stat.icon}
                      size="lg"
                      color={stat.color}
                    />
                    <Badge
                      colorScheme={
                        stat.changeType === 'positive'
                          ? 'success'
                          : stat.changeType === 'negative'
                          ? 'error'
                          : 'gray'
                      }
                      variant="subtle"
                    >
                      {stat.change}
                    </Badge>
                  </HStack>
                  <VStack space={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      {stat.value}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {stat.title}
                    </Text>
                  </VStack>
                </VStack>
              </EnterpriseCard>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Quick Actions */}
        <VStack space={4}>
          <Heading size="md" color="gray.700">
            Quick Actions
          </Heading>
          <SimpleGrid columns={2} space={4}>
            {quickActions.map((action, index) => (
              <Pressable key={index}>
                <EnterpriseCard variant="outlined">
                  <VStack space={3} alignItems="center">
                    <Icon
                      as={MaterialIcons}
                      name={action.icon}
                      size="xl"
                      color={action.color}
                    />
                    <VStack space={1} alignItems="center">
                      <Text fontSize="md" fontWeight="semibold" color="gray.800">
                        {action.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        textAlign="center"
                      >
                        {action.description}
                      </Text>
                    </VStack>
                  </VStack>
                </EnterpriseCard>
              </Pressable>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Recent Activities */}
        <VStack space={4}>
          <Heading size="md" color="gray.700">
            Recent Activities
          </Heading>
          <EnterpriseCard variant="elevated">
            <VStack space={0} divider={<Divider />}>
              {recentActivities.map((activity, index) => (
                <HStack
                  key={activity.id}
                  justifyContent="space-between"
                  alignItems="center"
                  py={3}
                  px={1}
                >
                  <HStack space={3} alignItems="center" flex={1}>
                    <Icon
                      as={MaterialIcons}
                      name={
                        activity.type === 'success'
                          ? 'check-circle'
                          : activity.type === 'warning'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                      color={
                        activity.type === 'success'
                          ? 'success.500'
                          : activity.type === 'warning'
                          ? 'warning.500'
                          : 'info.500'
                      }
                    />
                    <VStack space={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.800">
                        {activity.action}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {activity.user}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text fontSize="xs" color="gray.400">
                    {activity.time}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </EnterpriseCard>
        </VStack>

        {/* System Status */}
        <VStack space={4}>
          <Heading size="md" color="gray.700">
            System Status
          </Heading>
          <EnterpriseCard variant="elevated">
            <VStack space={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Server Performance
                </Text>
                <Text fontSize="sm" color="success.600">
                  Excellent
                </Text>
              </HStack>
              <Progress value={95} colorScheme="success" size="sm" />
              
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Database Health
                </Text>
                <Text fontSize="sm" color="success.600">
                  Good
                </Text>
              </HStack>
              <Progress value={87} colorScheme="success" size="sm" />
              
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Memory Usage
                </Text>
                <Text fontSize="sm" color="warning.600">
                  Moderate
                </Text>
              </HStack>
              <Progress value={67} colorScheme="warning" size="sm" />
            </VStack>
          </EnterpriseCard>
        </VStack>
      </VStack>
    </EnterpriseLayout>
  );
};

export default HomeScreen;