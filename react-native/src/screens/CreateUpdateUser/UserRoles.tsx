import { Box, Checkbox, VStack, HStack, Text, Heading, Divider, Badge, Icon, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import i18n from 'i18n-js';
import { getAllRoles, getUserRoles } from '../../api/IdentityAPI';
import { UserRole } from '../../types';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';

interface UserRoleWithSelection extends UserRole {
  isSelected: boolean;
}

interface UserRolesProps {
  editingUser?: {
    id?: string;
    [key: string]: any;
  };
  onChangeRoles: (roles: string[]) => void;
}

function UserRoles({ editingUser, onChangeRoles }: UserRolesProps) {
  const [roles, setRoles] = useState<UserRoleWithSelection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onPress = (index: number) => {
    setRoles(
      roles.map((role, i) => ({
        ...role,
        isSelected: index === i ? !role.isSelected : role.isSelected,
      })),
    );
  };

  useEffect(() => {
    setLoading(true);
    const requests: Promise<any>[] = [getAllRoles()];
    if (editingUser?.id) requests.push(getUserRoles(editingUser.id));

    Promise.all(requests).then(([allRoles = [], userRoles = []]) => {
      setRoles(
        allRoles.map((role: UserRole) => ({
          ...role,
          isSelected: editingUser?.id
            ? !!userRoles?.find((userRole: UserRole) => userRole?.id === role?.id)
            : role.isDefault,
        })),
      );
    }).finally(() => {
      setLoading(false);
    });
  }, [editingUser?.id]);

  useEffect(() => {
    onChangeRoles(roles.filter(role => role.isSelected).map(role => role.name));
  }, [roles, onChangeRoles]);

  if (loading) {
    return (
      <VStack space={4} alignItems="center" py={8}>
        <Spinner size="lg" color="primary.500" />
        <Text color="gray.500">{i18n.t('User:LoadingRoles')}</Text>
      </VStack>
    );
  }

  return (
    <VStack space={6}>
      <VStack space={1}>
        <Heading size="sm" color="gray.700">
          {i18n.t('User:UserRolesAndPermissions')}
        </Heading>
        <Text fontSize="xs" color="gray.500">
          {i18n.t('User:AssignRolesDescription')}
        </Text>
      </VStack>
      
      <Divider />
      
      <VStack space={3}>
        {roles.length === 0 ? (
          <VStack space={4} alignItems="center" py={8}>
            <Icon as={MaterialIcons} name="security" size="xl" color="gray.400" />
            <Text color="gray.500" textAlign="center">
              {i18n.t('User:NoRolesAvailable')}
            </Text>
          </VStack>
        ) : (
          roles.map((role, index) => (
            <Box
              key={role.id}
              p={4}
              bg="white"
              borderWidth={1}
              borderColor={role.isSelected ? "primary.200" : "gray.200"}
              borderRadius="lg"
              shadow={role.isSelected ? 2 : 1}
            >
              <HStack space={3} alignItems="center">
                <Checkbox
                  value={role.name}
                  isChecked={role.isSelected}
                  onChange={() => onPress(index)}
                  colorScheme="primary"
                  size="md"
                />
                <VStack flex={1} space={1}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="md" fontWeight="medium" color="gray.700">
                      {role.name}
                    </Text>
                    {role.isDefault && (
                      <Badge colorScheme="blue" variant="subtle" size="sm">
                        {i18n.t('User:Default')}
                      </Badge>
                    )}
                  </HStack>
                  {role.isPublic !== undefined && (
                    <Text fontSize="xs" color="gray.500">
                      {role.isPublic ? i18n.t('User:PublicRole') : i18n.t('User:PrivateRole')}
                    </Text>
                  )}
                </VStack>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
      
      {roles.filter(role => role.isSelected).length > 0 && (
        <>
          <Divider />
          <VStack space={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              {i18n.t('User:SelectedRoles')} ({roles.filter(role => role.isSelected).length})
            </Text>
            <HStack flexWrap="wrap" space={2}>
              {roles
                .filter(role => role.isSelected)
                .map(role => (
                  <Badge
                    key={role.id}
                    colorScheme="primary"
                    variant="solid"
                    size="sm"
                    mb={1}
                  >
                    {role.name}
                  </Badge>
                ))
              }
            </HStack>
          </VStack>
        </>
      )}
    </VStack>
  );
}

export default UserRoles;