import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Icon,
} from 'native-base';
import React, { useRef, useState } from 'react';
import { TextInput, Dimensions } from 'react-native';
import { object, string } from 'yup';
import { MaterialIcons } from '@expo/vector-icons';
import { login } from '../../api/AccountAPI';
import TenantBox from '../../components/TenantBox/TenantBox';
import { EnterpriseInput, EnterpriseFormActions } from '../../components/EnterpriseForm/EnterpriseForm';
import EnterpriseLayout from '../../components/EnterpriseLayout/EnterpriseLayout';
import EnterpriseCard from '../../components/EnterpriseCard/EnterpriseCard';
import AppActions from '../../store/actions/AppActions';
import LoadingActions from '../../store/actions/LoadingActions';
import PersistentStorageActions from '../../store/actions/PersistentStorageActions';
import { connectToRedux } from '../../utils/ReduxConnect';
import { Token } from '../../types';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  startLoading: (params: { key: string }) => void;
  stopLoading: (params: { key: string }) => void;
  setToken: (token: Token) => void;
  fetchAppConfig: (params: { showLoading: boolean; callback: () => void }) => void;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const ValidationSchema = object().shape({
  username: string().required('AbpAccount:ThisFieldIsRequired.'),
  password: string().required('AbpAccount:ThisFieldIsRequired.'),
});

function LoginScreen({ startLoading, stopLoading, setToken, fetchAppConfig }: LoginScreenProps) {
  const [showTenantSelection, setShowTenantSelection] = useState<boolean>(false);
  const passwordRef = useRef<TextInput>(null);

  const toggleTenantSelection = () => {
    setShowTenantSelection(!showTenantSelection);
  };

  const submit = ({ username, password }: LoginFormValues) => {
    startLoading({ key: 'login' });
    login({ username, password })
      .then((data) => {
        // Set token without decoding - let TokenUtils handle JWT validation
        setToken(data);
      })
      .then(
        () =>
          new Promise((resolve) =>
            fetchAppConfig({
              showLoading: false,
              callback: () => resolve(true),
            })
          )
      )
      .finally(() => stopLoading({ key: 'login' }));
  };

  const formik = useFormik<LoginFormValues>({
    validationSchema: ValidationSchema,
    initialValues: { username: 'admin', password: '1q2w3E*' },
    onSubmit: submit,
  });

  return (
    <EnterpriseLayout scrollable={false} backgroundColor="gray.50">
      <Center flex={1} px={4}>
        {/* Logo Section */}
        <VStack space={8} alignItems="center" mb={8}>
          <Box
            bg="white"
            p={6}
            borderRadius="full"
            shadow={3}
          >
            <Image
              alt="Company Logo"
              source={require('../../../assets/logo.png')}
              size="xl"
            />
          </Box>
          <VStack space={2} alignItems="center">
            <Heading size="xl" color="gray.800">
              Welcome Back
            </Heading>
            <Text color="gray.500" fontSize="md" textAlign="center">
              Sign in to your account to continue
            </Text>
          </VStack>
        </VStack>

        {/* Login Form */}
        <Box w="full" maxW="400px">
          <EnterpriseCard variant="elevated" padding={6}>
            <VStack space={4}>
              {/* Tenant Selection */}
              <TenantBox
                showTenantSelection={showTenantSelection}
                toggleTenantSelection={toggleTenantSelection}
              />
              
              {/* Login Form Fields */}
              {!showTenantSelection && (
                <VStack space={4}>
                  <EnterpriseInput
                    // label={i18n.t('AbpAccount:UserNameOrEmailAddress')}
                    label='User name or Email'
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    isRequired
                    isInvalid={formik.touched.username && !!formik.errors.username}
                    errorMessage={formik.touched.username ? formik.errors.username : undefined}
                    placeholder="Enter your username or email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef?.current?.focus()}
                  />
                  
                  <EnterpriseInput
                    // label={i18n.t('AbpAccount:Password')}
                    label='Password'
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    type="password"
                    isRequired
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    errorMessage={formik.touched.password ? formik.errors.password : undefined}
                    placeholder="Enter your password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={() => formik.handleSubmit()}
                  />
                  
                  <EnterpriseFormActions
                    onSubmit={() => formik.handleSubmit()}
                    // submitText={i18n.t('AbpAccount:Login')}
                    submitText='Login'
                    isSubmitting={false}
                  />
                </VStack>
              )}
            </VStack>
          </EnterpriseCard>
        </Box>

        {/* Footer */}
        <VStack space={2} alignItems="center" mt={8}>
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="security" size="sm" color="gray.400" />
            <Text color="gray.400" fontSize="sm">
              Secure Enterprise Login
            </Text>
          </HStack>
        </VStack>
      </Center>
    </EnterpriseLayout>
  );
}



export default connectToRedux({
  component: LoginScreen,
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
    fetchAppConfig: AppActions.fetchAppConfigAsync,
    setToken: PersistentStorageActions.setToken,
  },
}) as any;
