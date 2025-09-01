import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Button,
  useToast,
  AlertDialog,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { createUser, getUserById, removeUser, updateUser } from '../../api/IdentityAPI';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { User, CreateUpdateUserRequest } from '../../types';
import { connectToRedux } from '../../utils/ReduxConnect';
import { EnterpriseLayout } from '../../components/EnterpriseLayout/EnterpriseLayout';
import { EnterpriseCard } from '../../components/EnterpriseCard/EnterpriseCard';
import CreateUpdateUserForm from './CreateUpdateUserForm';

interface UserFormData {
  id?: string;
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  lockoutEnabled: boolean;
  roleNames?: string[];
}

interface RouteParams {
  userId?: string;
}

interface CreateUpdateUserScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: RouteParams }, 'params'>;
  startLoading: (params: { key: string }) => void;
  stopLoading: (params: { key: string }) => void;
  loading?: any;
}

function CreateUpdateUserScreen({ navigation, route, startLoading, stopLoading }: CreateUpdateUserScreenProps) {
  const [user, setUser] = useState<User | undefined>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();
  const userId = route.params?.userId;
  const isEditing = !!userId;
  const cancelRef = React.useRef(null);

  const remove = async () => {
    try {
      startLoading({ key: 'remove user' });
      await removeUser(userId!);
      toast.show({
        title: 'Success',
        description: 'User deleted successfully',
      });
      navigation.goBack();
    } catch (error) {
      toast.show({
        title: 'Error',
        description: 'Failed to delete user',
      });
    } finally {
      stopLoading({ key: 'remove user' });
      setIsDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((data: User) => setUser(data));
    }
  }, [userId]);

  const submit = async (data: UserFormData) => {
    try {
      startLoading({ key: 'saveUser' });
      const requestData: CreateUpdateUserRequest = {
        userName: data.userName,
        email: data.email,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        isActive: true,
        lockoutEnabled: data.lockoutEnabled,
        password: data.password,
        roleNames: data.roleNames
      };
      
      if (data.id) {
        await updateUser(requestData, userId!);
        toast.show({
          title: 'Success',
          description: 'User updated successfully',
        });
      } else {
        await createUser(requestData);
        toast.show({
          title: 'Success',
          description: 'User created successfully',
        });
      }
      
      navigation.goBack();
    } catch (error) {
      toast.show({
        title: 'Error',
        description: isEditing ? 'Failed to update user' : 'Failed to create user',
      });
    } finally {
      stopLoading({ key: 'saveUser' });
    }
  };

  const renderContent = () => {
    if (userId && !user) {
      return (
        <EnterpriseCard>
          <VStack space={4} alignItems="center" py={8}>
            <Icon as={MaterialIcons} name="hourglass-empty" size="xl" color="gray.400" />
            <Text color="gray.500">Loading user data...</Text>
          </VStack>
        </EnterpriseCard>
      );
    }

    return (
      <VStack space={6}>
        <EnterpriseCard>
          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack space={1}>
                <Heading size="lg" color="gray.800">
                  {isEditing ? 'Edit User' : 'Create New User'}
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  {isEditing 
                    ? `Update information for ${user?.userName || 'user'}` 
                    : 'Fill in the details to create a new user account'
                  }
                </Text>
              </VStack>
              <Icon 
                as={MaterialIcons} 
                name={isEditing ? 'edit' : 'person-add'} 
                size="lg" 
                color="primary.500" 
              />
            </HStack>
          </VStack>
        </EnterpriseCard>
        
        <CreateUpdateUserForm 
          editingUser={user} 
          submit={submit} 
          remove={() => setIsDeleteDialogOpen(true)} 
        />
      </VStack>
    );
  };

  return (
    <EnterpriseLayout>
      <VStack space={4} p={4} flex={1}>
        {/* Header with Back Button */}
        <HStack space={3} alignItems="center" mb={2}>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => navigation.goBack()}
            leftIcon={<Icon as={MaterialIcons} name="arrow-back" size="sm" />}
          >
            Back
          </Button>
        </HStack>
        
        {renderContent()}
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete User</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure you want to delete user "{user?.userName}"? This action cannot be undone.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => setIsDeleteDialogOpen(false)}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={remove}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </VStack>
    </EnterpriseLayout>
  );
}

export default connectToRedux({
  component: CreateUpdateUserScreen,
  stateProps: (state: any) => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});