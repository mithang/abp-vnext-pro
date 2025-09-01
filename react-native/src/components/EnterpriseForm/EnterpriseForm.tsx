import React from 'react';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  WarningOutlineIcon,
  Select,
  Switch,
  TextArea,
} from 'native-base';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';

// Form Field Props
interface BaseFieldProps {
  label?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  helperText?: string;
  isDisabled?: boolean;
}

// Text Input Field
interface EnterpriseInputProps extends BaseFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const EnterpriseInput: React.FC<EnterpriseInputProps> = ({
  label,
  isRequired,
  isInvalid,
  errorMessage,
  helperText,
  isDisabled,
  value,
  onChangeText,
  placeholder,
  type = 'text',
  autoCapitalize = 'none',
  keyboardType = 'default',
  returnKeyType = 'done',
  onSubmitEditing,
  size = 'lg',
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} isDisabled={isDisabled} mb={4}>
      {label && (
        <FormControl.Label>
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {label}
          </Text>
        </FormControl.Label>
      )}
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        type={type}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        size={size}
        bg="white"
        borderColor="gray.300"
        _focus={{
          borderColor: 'primary.500',
          bg: 'white',
        }}
        _invalid={{
          borderColor: 'error.500',
        }}
      />
      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
      {helperText && !errorMessage && (
        <FormControl.HelperText>
          {helperText}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
};

// Select Field
interface SelectOption {
  label: string;
  value: string;
}

interface EnterpriseSelectProps extends BaseFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
}

export const EnterpriseSelect: React.FC<EnterpriseSelectProps> = ({
  label,
  isRequired,
  isInvalid,
  errorMessage,
  helperText,
  isDisabled,
  value,
  onValueChange,
  placeholder,
  options,
  size = 'lg',
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} isDisabled={isDisabled} mb={4}>
      {label && (
        <FormControl.Label>
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {label}
          </Text>
        </FormControl.Label>
      )}
      <Select
        selectedValue={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        size={size}
        bg="white"
        borderColor="gray.300"
        _selectedItem={{
          bg: 'primary.100',
        }}
      >
        {options.map((option) => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Select>
      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
      {helperText && !errorMessage && (
        <FormControl.HelperText>
          {helperText}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
};

// Switch Field
interface EnterpriseSwitchProps extends BaseFieldProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const EnterpriseSwitch: React.FC<EnterpriseSwitchProps> = ({
  label,
  isRequired,
  isInvalid,
  errorMessage,
  helperText,
  isDisabled,
  value,
  onValueChange,
  size = 'md',
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} isDisabled={isDisabled} mb={4}>
      <HStack justifyContent="space-between" alignItems="center">
        {label && (
          <Text fontSize="sm" fontWeight="medium" color="gray.700" flex={1}>
            {label}
          </Text>
        )}
        <Switch
          value={value}
          onValueChange={onValueChange}
          size={size}
          colorScheme="primary"
        />
      </HStack>
      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
      {helperText && !errorMessage && (
        <FormControl.HelperText>
          {helperText}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
};

// TextArea Field
interface EnterpriseTextAreaProps extends BaseFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const EnterpriseTextArea: React.FC<EnterpriseTextAreaProps> = ({
  label,
  isRequired,
  isInvalid,
  errorMessage,
  helperText,
  isDisabled,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  size = 'lg',
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} isDisabled={isDisabled} mb={4}>
      {label && (
        <FormControl.Label>
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {label}
          </Text>
        </FormControl.Label>
      )}
      <TextArea
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        size={size}
        bg="white"
        borderColor="gray.300"
        autoCompleteType="off"
        _focus={{
          borderColor: 'primary.500',
          bg: 'white',
        }}
        _invalid={{
          borderColor: 'error.500',
        }}
      />
      {errorMessage && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
      {helperText && !errorMessage && (
        <FormControl.HelperText>
          {helperText}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
};

// Form Actions
interface EnterpriseFormActionsProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  submitText?: string;
  cancelText?: string;
  deleteText?: string;
  isSubmitting?: boolean;
  isDeleteDisabled?: boolean;
  showDelete?: boolean;
}

export const EnterpriseFormActions: React.FC<EnterpriseFormActionsProps> = ({
  onSubmit,
  onCancel,
  onDelete,
  submitText = 'Save',
  cancelText = 'Cancel',
  deleteText = 'Delete',
  isSubmitting = false,
  isDeleteDisabled = false,
  showDelete = false,
}) => {
  return (
    <VStack space={3} mt={6}>
      <HStack space={3} justifyContent="flex-end">
        {onCancel && (
          <Button
            variant="outline"
            onPress={onCancel}
            isDisabled={isSubmitting}
            size="lg"
            px={6}
          >
            {cancelText}
          </Button>
        )}
        {onSubmit && (
          <Button
            onPress={onSubmit}
            isLoading={isSubmitting}
            size="lg"
            px={6}
          >
            {submitText}
          </Button>
        )}
      </HStack>
      {showDelete && onDelete && (
        <Button
          variant="outline"
          colorScheme="error"
          onPress={onDelete}
          isDisabled={isDeleteDisabled || isSubmitting}
          size="lg"
        >
          {deleteText}
        </Button>
      )}
    </VStack>
  );
};

export default {
  EnterpriseInput,
  EnterpriseSelect,
  EnterpriseSwitch,
  EnterpriseTextArea,
  EnterpriseFormActions,
};