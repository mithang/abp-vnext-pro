import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
  Badge,
  Divider,
  Spinner,
  Center,
  Input,
  Button,
  Menu,
  Heading,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { EnterpriseCard } from '../EnterpriseCard/EnterpriseCard';

interface Column {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

interface EnterpriseDataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  onRowPress?: (item: any) => void;
  onAdd?: () => void;
  onRefresh?: () => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  title?: string;
  emptyMessage?: string;
  actions?: {
    label: string;
    onPress: (item: any) => void;
    icon?: string;
    color?: string;
  }[];
}

export const EnterpriseDataTable: React.FC<EnterpriseDataTableProps> = ({
  data,
  columns,
  loading = false,
  onRowPress,
  onAdd,
  onRefresh,
  searchable = false,
  searchValue = '',
  onSearchChange,
  title,
  emptyMessage = 'No data available',
  actions = [],
}) => {
  const renderCell = (column: Column, item: any) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    if (typeof value === 'boolean') {
      return (
        <Badge
          colorScheme={value ? 'success' : 'error'}
          variant="subtle"
        >
          {value ? 'Active' : 'Inactive'}
        </Badge>
      );
    }
    
    return (
      <Text
        fontSize="sm"
        color="gray.700"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value || '-'}
      </Text>
    );
  };

  const renderActions = (item: any) => {
    if (actions.length === 0) return null;
    
    if (actions.length === 1) {
      const action = actions[0];
      return (
        <Pressable onPress={() => action.onPress(item)}>
          <Icon
            as={MaterialIcons}
            name={action.icon || 'edit'}
            size="sm"
            color={action.color || 'primary.500'}
          />
        </Pressable>
      );
    }
    
    return (
      <Menu
        trigger={(triggerProps) => (
          <Pressable {...triggerProps}>
            <Icon
              as={MaterialIcons}
              name="more-vert"
              size="sm"
              color="gray.500"
            />
          </Pressable>
        )}
      >
        {actions.map((action, index) => (
          <Menu.Item
            key={index}
            onPress={() => action.onPress(item)}
          >
            <HStack space={2} alignItems="center">
              {action.icon && (
                <Icon
                  as={MaterialIcons}
                  name={action.icon}
                  size="sm"
                  color={action.color || 'gray.600'}
                />
              )}
              <Text>{action.label}</Text>
            </HStack>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <VStack space={4} flex={1}>
      {/* Header */}
      <VStack space={4}>
        {title && (
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="lg" color="gray.800">
              {title}
            </Heading>
            <HStack space={2}>
              {onRefresh && (
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={onRefresh}
                  leftIcon={
                    <Icon as={MaterialIcons} name="refresh" size="sm" />
                  }
                >
                  Refresh
                </Button>
              )}
              {onAdd && (
                <Button
                  size="sm"
                  onPress={onAdd}
                  leftIcon={
                    <Icon as={MaterialIcons} name="add" size="sm" />
                  }
                >
                  Add New
                </Button>
              )}
            </HStack>
          </HStack>
        )}
        
        {searchable && (
          <Input
            placeholder="Search..."
            value={searchValue}
            onChangeText={onSearchChange}
            InputLeftElement={
              <Icon
                as={MaterialIcons}
                name="search"
                size="sm"
                ml={2}
                color="gray.400"
              />
            }
            size="md"
          />
        )}
      </VStack>

      {/* Table */}
      <EnterpriseCard variant="elevated" padding={0}>
        {loading ? (
          <Center py={8}>
            <Spinner size="lg" />
            <Text mt={2} color="gray.500">
              Loading...
            </Text>
          </Center>
        ) : data.length === 0 ? (
          <Center py={8}>
            <Icon
              as={MaterialIcons}
              name="inbox"
              size="xl"
              color="gray.300"
              mb={2}
            />
            <Text color="gray.500" fontSize="md">
              {emptyMessage}
            </Text>
          </Center>
        ) : (
          <VStack space={0} divider={<Divider />}>
            {/* Table Header */}
            <HStack
              bg="gray.50"
              px={4}
              py={3}
              justifyContent="space-between"
              alignItems="center"
            >
              {columns.map((column, index) => (
                <Box key={column.key} flex={column.width ? undefined : 1} width={column.width}>
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.600"
                    textTransform="uppercase"
                  >
                    {column.title}
                  </Text>
                </Box>
              ))}
              {actions.length > 0 && (
                <Box width="40px">
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.600"
                    textTransform="uppercase"
                    textAlign="center"
                  >
                    Actions
                  </Text>
                </Box>
              )}
            </HStack>
            
            {/* Table Rows */}
            {data.map((item, rowIndex) => (
              <Pressable
                key={rowIndex}
                onPress={() => onRowPress?.(item)}
                _pressed={{ bg: 'gray.50' }}
              >
                <HStack
                  px={4}
                  py={3}
                  justifyContent="space-between"
                  alignItems="center"
                  minH="60px"
                >
                  {columns.map((column) => (
                    <Box
                      key={column.key}
                      flex={column.width ? undefined : 1}
                      width={column.width}
                      pr={2}
                    >
                      {renderCell(column, item)}
                    </Box>
                  ))}
                  {actions.length > 0 && (
                    <Box width="40px" alignItems="center">
                      {renderActions(item)}
                    </Box>
                  )}
                </HStack>
              </Pressable>
            ))}
          </VStack>
        )}
      </EnterpriseCard>
    </VStack>
  );
};

export default EnterpriseDataTable;