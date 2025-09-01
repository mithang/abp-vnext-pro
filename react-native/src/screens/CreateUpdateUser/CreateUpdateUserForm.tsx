import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Icon,
  Input,
  KeyboardAvoidingView,
  Stack,
  VStack,
  HStack,
  Text,
  Heading,
  Divider,
  Switch,
  Badge
} from 'native-base';
import React, { useRef, useState } from 'react';
import { Platform, TextInput } from 'react-native';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import { EnterpriseCard } from '../../components/EnterpriseCard/EnterpriseCard';
import { EnterpriseInput, EnterpriseFormActions } from '../../components/EnterpriseForm/EnterpriseForm';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';
import { usePermission } from '../../hooks/UsePermission';
import UserRoles from './UserRoles';

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

interface CreateUpdateUserFormProps {
  editingUser?: UserFormData;
  submit: (data: UserFormData) => void;
  remove: () => void;
}

const validations = {
  userName: Yup.string().required('AbpAccount:ThisFieldIsRequired.'),
  email: Yup.string()
    .email('AbpAccount:ThisFieldIsNotAValidEmailAddress.')
    .required('AbpAccount:ThisFieldIsRequired.'),
};

let roleNames: string[] = [];

function onChangeRoles(roles: string[]) {
  roleNames = roles;
}

function CreateUpdateUserForm({ editingUser, submit, remove }: CreateUpdateUserFormProps) {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const usernameRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const hasRemovePermission = usePermission('AbpIdentity.Users.Delete');

  const onSubmit = (values: UserFormData) => {
    submit({
      ...editingUser,
      ...values,
      roleNames,
    });
  };

  const passwordValidation = Yup.lazy(() => {
    if (editingUser?.id) {
      return Yup.string();
    }
    return Yup.string().required('AbpAccount:ThisFieldIsRequired.');
  });

  const formik = useFormik<UserFormData>({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validations,
      password: passwordValidation,
    }),
    initialValues: {
      userName: editingUser?.userName || '',
      email: editingUser?.email || '',
      name: editingUser?.name || '',
      surname: editingUser?.surname || '',
      phoneNumber: editingUser?.phoneNumber || '',
      password: '',
      lockoutEnabled: editingUser?.lockoutEnabled || false,
    },
    onSubmit,
  });

  return (
    <VStack space={6}>
      {/* Tab Navigation */}
      <EnterpriseCard>
        <VStack space={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="md" color="gray.700">
              User Configuration
            </Heading>
            <Badge colorScheme={editingUser?.id ? 'warning' : 'success'} variant="subtle">
              {editingUser?.id ? 'Edit Mode' : 'Create Mode'}
            </Badge>
          </HStack>
          
          <Button.Group
            colorScheme="primary"
            size="sm"
            isAttached
            variant="outline"
          >
            <Button
              flex={1}
              variant={selectedTab === 0 ? 'solid' : 'outline'}
              onPress={() => setSelectedTab(0)}
              leftIcon={<Icon as={MaterialIcons} name="person" size="sm" />}
            >
              User Information
            </Button>
            <Button
              flex={1}
              variant={selectedTab === 1 ? 'solid' : 'outline'}
              onPress={() => setSelectedTab(1)}
              leftIcon={<Icon as={MaterialIcons} name="security" size="sm" />}
            >
              Roles & Permissions
            </Button>
          </Button.Group>
        </VStack>
      </EnterpriseCard>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <EnterpriseCard>

          {selectedTab === 0 ? (
            <VStack space={6}>
              <VStack space={1}>
                <Heading size="sm" color="gray.700">
                  Basic Information
                </Heading>
                <Text fontSize="xs" color="gray.500">
                  Enter the user's basic details and account information
                </Text>
              </VStack>
              
              <Divider />
              
              <VStack space={4}>
                <EnterpriseInput
                    label="Username"
                    placeholder="Enter username"
                    value={formik.values.userName}
                    onChangeText={formik.handleChange('userName')}
                    errorMessage={formik.touched.userName && formik.errors.userName ? formik.errors.userName : undefined}
                    isInvalid={formik.touched.userName && !!formik.errors.userName}
                    isRequired
                    autoCapitalize="none"
                  />
                
                <HStack space={4}>
                  <Box flex={1}>
                    <EnterpriseInput
                        label="First Name"
                        placeholder="Enter first name"
                        value={formik.values.name || ''}
                        onChangeText={formik.handleChange('name')}
                      />
                  </Box>
                  <Box flex={1}>
                    <EnterpriseInput
                        label="Last Name"
                        placeholder="Enter last name"
                        value={formik.values.surname || ''}
                        onChangeText={formik.handleChange('surname')}
                      />
                  </Box>
                </HStack>
                
                <EnterpriseInput
                    label="Email Address"
                    placeholder="Enter email address"
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    isRequired
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                
                <EnterpriseInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value={formik.values.phoneNumber || ''}
                    onChangeText={formik.handleChange('phoneNumber')}
                    keyboardType="phone-pad"
                  />
                
                {!editingUser?.id && (
                  <EnterpriseInput
                      label="Password"
                      placeholder="Enter password"
                      value={formik.values.password || ''}
                      onChangeText={formik.handleChange('password')}
                      errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                      isRequired
                      type={showPassword ? 'text' : 'password'}
                      autoCapitalize="none"
                    />
                )}
              </VStack>
              
              <Divider />
              
              <VStack space={4}>
                <VStack space={1}>
                  <Heading size="sm" color="gray.700">
                    Account Settings
                  </Heading>
                  <Text fontSize="xs" color="gray.500">
                    Configure account security and access settings
                  </Text>
                </VStack>
                
                <HStack justifyContent="space-between" alignItems="center" p={4} bg="gray.50" borderRadius="md">
                  <VStack space={1}>
                    <Text fontWeight="medium" color="gray.700">
                      Account Lockout
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Enable to allow account lockout after failed login attempts
                    </Text>
                  </VStack>
                  <Switch
                    isChecked={formik.values.lockoutEnabled}
                    onToggle={() =>
                      formik.setFieldValue(
                        'lockoutEnabled',
                        !formik.values.lockoutEnabled
                      )
                    }
                    colorScheme="primary"
                  />
                </HStack>
              </VStack>
            </VStack>
          ) : (
             <UserRoles editingUser={editingUser} onChangeRoles={onChangeRoles} />
           )}
         </EnterpriseCard>
       </KeyboardAvoidingView>
       
       <EnterpriseFormActions
          onSubmit={formik.handleSubmit}
          onCancel={() => {}}
          submitText={editingUser?.id ? 'Update User' : 'Create User'}
          isSubmitting={formik.isSubmitting}
          showDelete={!!editingUser?.id && hasRemovePermission}
          onDelete={remove}
          deleteText="Delete User"
        />
     </VStack>
  );
}

export default CreateUpdateUserForm;