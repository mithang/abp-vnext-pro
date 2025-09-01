import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  HStack,
  Text,
  Badge,
  Avatar,
  useToast,
} from 'native-base';
import { getUsers } from '../../api/IdentityAPI';
import { EnterpriseLayout } from '../../components/EnterpriseLayout/EnterpriseLayout';
import { EnterpriseDataTable } from '../../components/EnterpriseDataTable/EnterpriseDataTable';
import { useDispatch } from 'react-redux';
import { User } from '../../types';

const UsersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // dispatch(startLoading());
      const response = await getUsers();
      setUsers(response.items || []);
      setFilteredUsers(response.items || []);
    } catch (error) {
      toast.show({
        title: 'Error',
        description: 'Failed to fetch users',
      });
    } finally {
      setLoading(false);
      // // // dispatch(stopLoading());
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
    navigation.navigate('CreateUpdateUser' as never);
  };

  const handleEditUser = (user: User) => {
    (navigation as any).navigate('CreateUpdateUser', { userId: user.id });
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
      dispatch(stopLoading());
    }
  };

  const columns = [
    {
      key: 'user',
      title: 'User',
      width: '40%',
      render: (value: any, item: User) => (
        <HStack space={3} alignItems="center">
          <Avatar
            size="sm"
            bg="primary.500"
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.name}+${item.surname}&background=random`,
            }}
          >
            {item.name?.[0]}{item.surname?.[0]}
          </Avatar>
          <VStack space={0}>
            <Text fontSize="sm" fontWeight="medium" color="gray.800">
              {item.name} {item.surname}
            </Text>
            <Text fontSize="xs" color="gray.500">
              @{item.userName}
            </Text>
          </VStack>
        </HStack>
      ),
    },
    {
      key: 'email',
      title: 'Email',
      width: '35%',
      render: (value: string, item: User) => (
        <VStack space={0}>
          <Text fontSize="sm" color="gray.700">
            {value}
          </Text>
          {item.emailConfirmed && (
            <Badge colorScheme="success" variant="subtle" size="xs" alignSelf="flex-start">
              Verified
            </Badge>
          )}
        </VStack>
      ),
    },
    {
      key: 'isActive',
      title: 'Status',
      width: '15%',
      render: (value: boolean) => (
        <Badge
          colorScheme={value ? 'success' : 'error'}
          variant="subtle"
        >
          {value ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'creationTime',
      title: 'Created',
      width: '10%',
      render: (value: string) => (
        <Text fontSize="xs" color="gray.500">
          {new Date(value).toLocaleDateString()}
        </Text>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onPress: handleEditUser,
      icon: 'edit',
      color: 'primary.500',
    },
    {
      label: 'Delete',
      onPress: handleDeleteUser,
      icon: 'delete',
      color: 'error.500',
    },
  ];

  return (
    <EnterpriseLayout>
      <VStack space={4} p={4} flex={1}>
        <EnterpriseDataTable
          title="User Management"
          data={filteredUsers}
          columns={columns}
          loading={loading}
          onRowPress={handleEditUser}
          onAdd={handleAddUser}
          onRefresh={fetchUsers}
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          emptyMessage="No users found. Add your first user to get started."
          actions={actions}
        />
      </VStack>
    </EnterpriseLayout>
  );
};

export default UsersScreen;