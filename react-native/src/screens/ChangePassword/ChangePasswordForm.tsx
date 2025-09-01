import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Stack,
  Icon
} from 'native-base';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordSubmitData extends ChangePasswordFormValues {
  newPasswordConfirm: string;
}

interface ChangePasswordFormProps {
  submit: (data: ChangePasswordSubmitData) => void;
  cancel: () => void;
}

const ValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('AbpAccount:ThisFieldIsRequired.'),
  newPassword: Yup.string().required('AbpAccount:ThisFieldIsRequired.'),
});

function ChangePasswordForm({ submit, cancel }: ChangePasswordFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const currentPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);

  const onSubmit = (values: ChangePasswordFormValues) => {
    submit({
      ...values,
      newPasswordConfirm: values.newPassword,
    });
  };

  const formik = useFormik<ChangePasswordFormValues>({
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    onSubmit,
  });

  return (
    <>
      <Box px="3">
        <FormControl isRequired my="2">
          <Stack mx="4">
            <FormControl.Label>
              {i18n.t('AbpIdentity:DisplayName:CurrentPassword')}
            </FormControl.Label>
            <Input
              ref={currentPasswordRef}
              onSubmitEditing={() => newPasswordRef?.current?.focus()}
              returnKeyType="next"
              onChangeText={formik.handleChange('currentPassword')}
              onBlur={formik.handleBlur('currentPassword')}
              value={formik.values.currentPassword}
              textContentType="password"
              secureTextEntry={!showCurrentPassword}
              InputRightElement={
                <Icon
                  as={Ionicons}
                  size="5"
                  mr="2"
                  name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              }
            />
            <ValidationMessage>
              {formik.errors.currentPassword}
            </ValidationMessage>
          </Stack>
        </FormControl>

        <FormControl isRequired my="2">
          <Stack mx="4">
            <FormControl.Label>
              {i18n.t('AbpIdentity:DisplayName:NewPassword')}
            </FormControl.Label>
            <Input
              ref={newPasswordRef}
              returnKeyType="done"
              onChangeText={formik.handleChange('newPassword')}
              onBlur={formik.handleBlur('newPassword')}
              value={formik.values.newPassword}
              textContentType="newPassword"
              secureTextEntry={!showNewPassword}
              InputRightElement={
                <Icon
                  as={Ionicons}
                  size="5"
                  mr="2"
                  name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
            <ValidationMessage>{formik.errors.newPassword}</ValidationMessage>
          </Stack>
        </FormControl>
      </Box>
      <FormButtons
        submit={formik.handleSubmit}
        isSubmitDisabled={!formik.isValid}
      />
    </>
  );
}

export default ChangePasswordForm;