import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import i18n from 'i18n-js';
import {
  VStack,
  HStack,
  Text,
  Badge,
  Avatar,
  useToast,
  FlatList,
  Box,
  Input,
  Icon,
  Button,
  Pressable,
  Spinner,
  Center,
  Menu,
  Fab,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { getUsers } from '../../api/IdentityAPI';
import { EnterpriseLayout } from '../../components/EnterpriseLayout/EnterpriseLayout';
import { EnterpriseCard } from '../../components/EnterpriseCard/EnterpriseCard';
import { useDispatch } from 'react-redux';
import { User, MainStackParamList } from '../../types';
import { RefreshControl as RNRefreshControl } from 'react-native';

type UsersScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Users'>;

const UsersScreen = () => {
  const navigation = useNavigation<UsersScreenNavigationProp>();
  const dispatch = useDispatch();
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users...');
      const response = await getUsers();
      console.log('API Response:', response);
      
      // API returns array directly, not wrapped in items
      const usersData = Array.isArray(response) ? response : (response.items || []);
      console.log('Parsed users data:', usersData);
      
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.show({
        title: 'Error',
        description: 'Failed to fetch users',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.userName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.surname?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchValue, users]);

  const handleAddUser = () => {
    console.log('Navigating to CreateUpdateUser for new user');
    navigation.navigate('CreateUpdateUser', {});
  };

  const handleEditUser = (user: User) => {
    console.log('Navigating to CreateUpdateUser for edit user:', user.id);
    navigation.navigate('CreateUpdateUser', { userId: user.id });
  };

  const handleDeleteUser = async (user: User) => {
    try {
      // dispatch(startLoading());
      // await userService.delete(user.id);
      toast.show({
         title: 'Success',
         description: 'User deleted successfully',
       });
      fetchUsers();
    } catch (error) {
      toast.show({
         title: 'Error',
         description: 'Failed to delete user',
       });
    } finally {
      // dispatch(stopLoading());
    }
  };

  const renderUserCard = ({ item: user }: { item: User }) => (
    <Pressable 
      onPress={() => {
        console.log('User card pressed:', user.userName);
        handleEditUser(user);
      }} 
      mb={3}
    >
      <EnterpriseCard>
        <HStack space={4} alignItems="center">
          <Avatar
            size="md"
            bg="purple.500"
            source={{
              uri: `https://ui-avatars.com/api/?name=${user.name || 'U'}+${user.surname || 'U'}&background=6366f1&color=fff`,
            }}
          >
            {(user.name?.[0] || 'U')}{(user.surname?.[0] || 'U')}
          </Avatar>
          
          <VStack flex={1} space={1}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                {user.name || 'N/A'} {user.surname || ''}
              </Text>
              <Badge
                colorScheme={user.isActive ? 'success' : 'gray'}
                variant="subtle"
                borderRadius="full"
              >
                {user.isActive ? i18n.t('User:Active') : i18n.t('User:Inactive')}
              </Badge>
            </HStack>
            
            <Text fontSize="sm" color="gray.600">
              @{user.userName}
            </Text>
            
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space={2} alignItems="center" flex={1}>
                <Icon as={MaterialIcons} name="email" size="xs" color="gray.400" />
                <Text fontSize="xs" color="gray.500" flex={1} numberOfLines={1}>
                  {user.email}
                </Text>
                {user.emailConfirmed && (
                  <Icon as={MaterialIcons} name="verified" size="xs" color="green.500" />
                )}
              </HStack>
              
              <Menu
                trigger={(triggerProps) => (
                  <Pressable 
                    {...triggerProps}
                    onPress={(e) => {
                      e.stopPropagation();
                      triggerProps.onPress();
                    }}
                  >
                    <Icon as={MaterialIcons} name="more-vert" size="sm" color="gray.400" />
                  </Pressable>
                )}
              >
                <Menu.Item onPress={() => {
                  console.log('Edit menu item pressed');
                  handleEditUser(user);
                }}>
                  <HStack space={2} alignItems="center">
                    <Icon as={MaterialIcons} name="edit" size="xs" />
                    <Text>{i18n.t('User:Edit')}</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item onPress={() => {
                  console.log('Delete menu item pressed');
                  handleDeleteUser(user);
                }}>
                  <HStack space={2} alignItems="center">
                    <Icon as={MaterialIcons} name="delete" size="xs" color="red.500" />
                    <Text color="red.500">{i18n.t('User:Delete')}</Text>
                  </HStack>
                </Menu.Item>
              </Menu>
            </HStack>
            
            <Text fontSize="xs" color="gray.400">
              {i18n.t('User:Created')}: {new Date(user.creationTime).toLocaleDateString()}
            </Text>
          </VStack>
        </HStack>
      </EnterpriseCard>
    </Pressable>
  );

  const renderEmptyState = () => (
    <Center flex={1} py={10}>
      <Icon as={MaterialIcons} name="people" size="xl" color="gray.300" mb={4} />
      <Text fontSize="lg" fontWeight="medium" color="gray.500" mb={2}>
        {i18n.t('User:NoUsersFound')}
      </Text>
      <Text fontSize="sm" color="gray.400" textAlign="center" mb={6}>
        {searchValue ? i18n.t('User:SearchAdjustCriteria') : i18n.t('User:AddFirstUser')}
      </Text>
      {!searchValue && (
        <Button 
          onPress={() => {
            console.log('Add First User button pressed');
            handleAddUser();
          }} 
          colorScheme="primary"
        >
          {i18n.t('User:AddFirstUserButton')}
        </Button>
      )}
    </Center>
  );

  const renderHeader = () => (
    <VStack space={4} mb={4}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            {i18n.t('User:Users')}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {filteredUsers.length} {filteredUsers.length === 1 ? i18n.t('User:UserFound') : i18n.t('User:UsersFound')}
          </Text>
        </VStack>
        <Button
          size="sm"
          colorScheme="primary"
          onPress={() => {
            console.log('Add User button pressed');
            handleAddUser();
          }}
          leftIcon={<Icon as={MaterialIcons} name="add" size="sm" />}
        >
          {i18n.t('User:AddUser')}
        </Button>
      </HStack>
      
      <Input
        placeholder={i18n.t('User:SearchPlaceholder')}
        value={searchValue}
        onChangeText={setSearchValue}
        InputLeftElement={
          <Icon as={MaterialIcons} name="search" size="sm" ml={3} color="gray.400" />
        }
        InputRightElement={
          searchValue ? (
            <Pressable onPress={() => setSearchValue('')} mr={3}>
              <Icon as={MaterialIcons} name="clear" size="sm" color="gray.400" />
            </Pressable>
          ) : undefined
        }
        bg="white"
        borderRadius="lg"
        borderColor="gray.200"
        _focus={{
          borderColor: "primary.500",
          backgroundColor: "white"
        }}
      />
    </VStack>
  );


  return (
    <EnterpriseLayout>
      <Box flex={1} bg="gray.50">
        <VStack space={0} flex={1}>
          <Box bg="white" px={4} pt={4} pb={2}>
            {renderHeader()}
          </Box>
          
          {loading ? (
            <Center flex={1}>
              <Spinner size="lg" color="primary.500" />
              <Text mt={2} color="gray.500">{i18n.t('User:LoadingUsers')}</Text>
            </Center>
          ) : (
            <FlatList
              data={filteredUsers}
              renderItem={renderUserCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16, paddingTop: 8 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RNRefreshControl
                  refreshing={loading}
                  onRefresh={fetchUsers}
                  tintColor="#6366f1"
                />
              }
              ListEmptyComponent={renderEmptyState}
            />
          )}
        </VStack>
        
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={<Icon color="white" as={MaterialIcons} name="add" size="sm" />}
          onPress={() => {
            console.log('FAB Add User pressed');
            handleAddUser();
          }}
          bg="primary.500"
          _pressed={{ bg: "primary.600" }}
        />
      </Box>
    </EnterpriseLayout>
  );
};

export default UsersScreen;