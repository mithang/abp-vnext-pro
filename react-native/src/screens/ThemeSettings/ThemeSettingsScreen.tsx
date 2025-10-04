import i18n from 'i18n-js';
import { Box, Button, Heading, HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, predefinedColors } from '../../contexts/ThemeContext';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <HStack space={3} justifyContent="center" flexWrap="wrap">
      {colors.map((color) => (
        <Pressable
          key={color}
          onPress={() => onColorSelect(color)}
          style={[
            styles.colorCircle,
            { backgroundColor: color },
            selectedColor === color && styles.selectedColor,
          ]}
        />
      ))}
    </HStack>
  );
};

export default function ThemeSettingsScreen() {
  const { theme, setThemeMode, setPrimaryColor } = useTheme();

  return (
    <Box flex={1} bg={theme.colors.background} px={4} py={6}>
      <VStack space={6}>
        {/* Header */}
        <Heading size="lg" color={theme.colors.text}>
          {i18n.t('Theme:Settings')}
        </Heading>

        {/* Primary Color Selection */}
        <VStack space={4}>
          <Text fontSize="md" fontWeight="600" color={theme.colors.text}>
            {i18n.t('Theme:PrimaryColor')}
          </Text>
          
          <ColorPicker
            colors={predefinedColors}
            selectedColor={theme.primaryColor}
            onColorSelect={setPrimaryColor}
          />
        </VStack>

        {/* Light/Dark Mode Toggle */}
        <VStack space={4}>
          <Text fontSize="md" fontWeight="600" color={theme.colors.text}>
            {i18n.t('Theme:Mode')}
          </Text>
          
          <HStack space={3}>
            <Button
              flex={1}
              bg={theme.mode === 'light' ? theme.colors.primary : theme.colors.surface}
              onPress={() => setThemeMode('light')}
              _pressed={{ bg: theme.colors.primary }}
            >
              <Text color={theme.mode === 'light' ? 'white' : theme.colors.text}>
                {i18n.t('Theme:Light')}
              </Text>
            </Button>
            
            <Button
              flex={1}
              bg={theme.mode === 'dark' ? theme.colors.primary : theme.colors.surface}
              onPress={() => setThemeMode('dark')}
              _pressed={{ bg: theme.colors.primary }}
            >
              <Text color={theme.mode === 'dark' ? 'white' : theme.colors.text}>
                {i18n.t('Theme:Dark')}
              </Text>
            </Button>
          </HStack>
        </VStack>

        {/* Preview Section */}
        <VStack space={4}>
          <Text fontSize="md" fontWeight="600" color={theme.colors.text}>
            {i18n.t('Theme:Preview')}
          </Text>
          
          <Box
            p={4}
            bg={theme.colors.surface}
            borderRadius="md"
            borderWidth={1}
            borderColor={theme.colors.primary}
          >
            <VStack space={2}>
              <Text fontSize="lg" fontWeight="bold" color={theme.colors.text}>
                {i18n.t('Theme:ExampleTitle')}
              </Text>
              <Text fontSize="sm" color={theme.colors.textSecondary}>
                {i18n.t('Theme:ExampleText')}
              </Text>
              <Button
                size="sm"
                bg={theme.colors.primary}
                mt={2}
                alignSelf="flex-start"
              >
                <Text color="white">{i18n.t('Theme:ExampleButton')}</Text>
              </Button>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
});
