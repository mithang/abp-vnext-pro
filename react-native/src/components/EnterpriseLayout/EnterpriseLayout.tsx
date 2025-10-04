import React from 'react';
import { Box, ScrollView, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { enterpriseStyles } from '../../utils/EnterpriseStyles';

interface EnterpriseLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: number;
  backgroundColor?: string;
}

export const EnterpriseLayout: React.FC<EnterpriseLayoutProps> = ({
  children,
  scrollable = true,
  padding = 4,
  backgroundColor = 'enterprise.background',
}) => {
  const content = (
    <VStack flex={1} space={0} bg={backgroundColor}>
      {children}
    </VStack>
  );

  return (
    <SafeAreaView style={enterpriseStyles.container}>
      {scrollable ? (
        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Box flex={1} p={padding}>
            {content}
          </Box>
        </ScrollView>
      ) : (
        <Box flex={1} p={padding}>
          {content}
        </Box>
      )}
    </SafeAreaView>
  );
};

export default EnterpriseLayout;