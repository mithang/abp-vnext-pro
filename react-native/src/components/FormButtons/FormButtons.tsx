import i18n from 'i18n-js';
import { Button, Text } from 'native-base';
import React, { forwardRef } from 'react';
import { Alert, StyleSheet, View, ViewStyle } from 'react-native';

interface FormButtonsProps {
  submit: () => void;
  remove?: () => void;
  removeMessage?: string;
  isRemoveDisabled?: boolean;
  isSubmitDisabled?: boolean;
  isShowRemove?: boolean;
  isShowSubmit?: boolean;
  style?: ViewStyle;
  forwardedRef?: React.Ref<any>;
}

function FormButtons({
  submit,
  remove,
  removeMessage,
  isRemoveDisabled,
  isSubmitDisabled,
  isShowRemove = false,
  isShowSubmit = true,
}: FormButtonsProps) {
  const confirmation = () => {
    Alert.alert(
      i18n.t('AbpUi:AreYouSure'),
      removeMessage,
      [
        {
          text: i18n.t('AbpUi:Cancel'),
          style: 'cancel',
        },
        { text: i18n.t('AbpUi:Yes'), onPress: () => remove?.() },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      {isShowRemove ? (
        <Button
          bg="danger.500"
          style={{ flex: 1, borderRadius: 0 }}
          onPress={() => confirmation()}
          disabled={isRemoveDisabled}>
          <Text>{i18n.t('AbpIdentity:Delete')}</Text>
        </Button>
      ) : null}
      {isShowSubmit ? (
        <Button
          style={{ flex: 1, borderRadius: 0 }}
          onPress={submit}
          disabled={isSubmitDisabled}>
          <Text>{i18n.t('AbpIdentity:Save')}</Text>
        </Button>
      ) : null}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
});

const Forwarded = forwardRef<any, FormButtonsProps>((props, ref) => (
  <FormButtons {...props} forwardedRef={ref} />
));

export default Forwarded;
