import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  TextArea,
  Select,
  Button,
  FormControl,
  useToast,
  KeyboardAvoidingView,
  ScrollView
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { sendNotification } from '../store/actions/notificationActions';
import { selectIsSending } from '../store/selectors/notificationSelectors';
import NotificationAPI, { User } from '../api/NotificationAPI';

const CreateNotificationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  
  const isSending = useSelector(selectIsSending);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [messageLevel, setMessageLevel] = useState('20');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await NotificationAPI.getUserList({
        skipCount: 0,
        maxResultCount: 100
      });
      setUsers(response.items);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.show({
        description: 'Failed to load users'
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSend = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Please enter content');
      return;
    }

    if (!selectedUser) {
      Alert.alert('Error', 'Please select a recipient');
      return;
    }

    const notificationData = {
      title: title.trim(),
      content: content.trim(),
      messageLevel: parseInt(messageLevel),
      receiveUserId: selectedUser.id,
      receiveUserName: selectedUser.userName
    };

    dispatch(sendNotification(notificationData));

    // Show success toast and navigate back
    toast.show({
      description: 'Notification sent successfully'
    });

    // Reset form
    setTitle('');
    setContent('');
    setMessageLevel('20');
    setSelectedUser(null);
    
    navigation.goBack();
  };

  const getMessageLevelLabel = (level: string) => {
    switch (level) {
      case '10': return 'Warning';
      case '20': return 'Information';
      case '30': return 'Error';
      default: return 'Information';
    }
  };

  const getMessageLevelColor = (level: string) => {
    switch (level) {
      case '10': return 'warning.500';
      case '20': return 'success.500';
      case '30': return 'error.500';
      default: return 'info.500';
    }
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <KeyboardAvoidingView flex={1} behavior="padding">
        <ScrollView flex={1}>
          <VStack flex={1} px={4} py={4} space={6}>
            <Text fontSize="xl" fontWeight="bold">
              Send Notification
            </Text>

            <VStack space={4}>
              <FormControl isRequired>
                <FormControl.Label>Title</FormControl.Label>
                <Input
                  placeholder="Enter notification title"
                  value={title}
                  onChangeText={setTitle}
                />
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Content</FormControl.Label>
                <TextArea
                  placeholder="Enter notification content"
                  value={content}
                  onChangeText={setContent}
                  h={20}
                  autoCompleteType={undefined}
                />
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Message Level</FormControl.Label>
                <Select
                  selectedValue={messageLevel}
                  onValueChange={setMessageLevel}
                  placeholder="Select message level"
                >
                  <Select.Item label="Warning" value="10" />
                  <Select.Item label="Information" value="20" />
                  <Select.Item label="Error" value="30" />
                </Select>
                
                <HStack mt={2} alignItems="center" space={2}>
                  <Box
                    w={3}
                    h={3}
                    borderRadius="full"
                    bg={getMessageLevelColor(messageLevel)}
                  />
                  <Text fontSize="sm" color="coolGray.600">
                    {getMessageLevelLabel(messageLevel)}
                  </Text>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label>Recipient</FormControl.Label>
                <Select
                  selectedValue={selectedUser?.id || ''}
                  onValueChange={(value) => {
                    const user = users.find(u => u.id === value);
                    setSelectedUser(user || null);
                  }}
                  placeholder={loadingUsers ? "Loading users..." : "Select recipient"}
                  isDisabled={loadingUsers}
                >
                  {users.map((user) => (
                    <Select.Item
                      key={user.id}
                      label={`${user.name || user.userName} (${user.email})`}
                      value={user.id}
                    />
                  ))}
                </Select>
                
                {selectedUser && (
                  <Box mt={2} p={3} bg="coolGray.50" borderRadius="md">
                    <Text fontSize="sm" fontWeight="medium">
                      {selectedUser.name || selectedUser.userName}
                    </Text>
                    <Text fontSize="xs" color="coolGray.600">
                      {selectedUser.email}
                    </Text>
                  </Box>
                )}
              </FormControl>
            </VStack>

            <VStack space={3} mt={6}>
              <Button
                onPress={handleSend}
                isLoading={isSending}
                isDisabled={!title || !content || !selectedUser}
                colorScheme="blue"
              >
                Send Notification
              </Button>
              
              <Button
                variant="outline"
                onPress={() => navigation.goBack()}
                isDisabled={isSending}
              >
                Cancel
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default CreateNotificationScreen;
