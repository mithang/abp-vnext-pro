import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Stack,
} from 'native-base';
import React, { useRef } from 'react';
import { Platform, TextInput } from 'react-native';
import * as Yup from 'yup';
import FormButtons from '../../components/FormButtons/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import { User } from '../../types';

interface ProfileFormData {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
}

interface ManageProfileFormProps {
  editingUser: User;
  submit: (data: ProfileFormData) => void;
  cancel: () => void;
}

const ValidationSchema = Yup.object().shape({
  userName: Yup.string().required('AbpAccount:ThisFieldIsRequired.'),
  email: Yup.string()
    .required('AbpAccount:ThisFieldIsRequired.')
    .email('AbpAccount:ThisFieldIsNotAValidEmailAddress.'),
});

function ManageProfileForm({ editingUser = {} as User, submit, cancel }: ManageProfileFormProps) {
  const usernameRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);

  const onSubmit = (values: ProfileFormData) => {
    submit({
      ...editingUser,
      ...values,
    });
  };

  const formik = useFormik<ProfileFormData>({
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    initialValues: {
      userName: editingUser.userName || '',
      name: editingUser.name || '',
      surname: editingUser.surname || '',
      email: editingUser.email || '',
      phoneNumber: editingUser.phoneNumber || '',
    },
    onSubmit,
  });

  return (
    <>
      <Box px="3">
        <KeyboardAvoidingView
          h={{
            base: '400px',
            lg: 'auto',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <FormControl isRequired my="2">
            <Stack mx="4">
              <FormControl.Label>
                {i18n.t('AbpIdentity:UserName')}
              </FormControl.Label>
              <Input
                ref={usernameRef}
                onSubmitEditing={() => nameRef?.current?.focus()}
                returnKeyType="next"
                onChangeText={formik.handleChange('userName')}
                onBlur={formik.handleBlur('userName')}
                value={formik.values.userName}
              />
              <ValidationMessage>{formik.errors.userName}</ValidationMessage>
            </Stack>
          </FormControl>

          <FormControl my="2">
            <Stack mx="4">
              <FormControl.Label>
                {i18n.t('AbpIdentity:DisplayName:Name')}
              </FormControl.Label>
              <Input
                ref={nameRef}
                onSubmitEditing={() => surnameRef?.current?.focus()}
                returnKeyType="next"
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
              />
            </Stack>
          </FormControl>

          <FormControl my="2">
            <Stack mx="4">
              <FormControl.Label>
                {i18n.t('AbpIdentity:DisplayName:Surname')}
              </FormControl.Label>
              <Input
                ref={surnameRef}
                onSubmitEditing={() => phoneNumberRef?.current?.focus()}
                returnKeyType="next"
                onChangeText={formik.handleChange('surname')}
                onBlur={formik.handleBlur('surname')}
                value={formik.values.surname}
              />
            </Stack>
          </FormControl>

          <FormControl my="2">
            <Stack mx="4">
              <FormControl.Label>
                {i18n.t('AbpIdentity:PhoneNumber')}
              </FormControl.Label>
              <Input
                ref={phoneNumberRef}
                onSubmitEditing={() => emailRef?.current?.focus()}
                returnKeyType="next"
                onChangeText={formik.handleChange('phoneNumber')}
                onBlur={formik.handleBlur('phoneNumber')}
                value={formik.values.phoneNumber}
              />
            </Stack>
          </FormControl>

          <FormControl isRequired my="2">
            <Stack mx="4">
              <FormControl.Label>
                {i18n.t('AbpIdentity:EmailAddress')}
              </FormControl.Label>
              <Input
                ref={emailRef}
                returnKeyType="done"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
              />
              <ValidationMessage>{formik.errors.email}</ValidationMessage>
            </Stack>
          </FormControl>
        </KeyboardAvoidingView>
      </Box>
      <FormButtons
        submit={formik.handleSubmit}
        isSubmitDisabled={!formik.isValid}
      />
    </>
  );
}

export default ManageProfileForm;