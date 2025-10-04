import { Spinner, View } from 'native-base';
import React, { forwardRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  createLoadingSelector,
  createOpacitySelector
} from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';

interface LoadingProps {
  loading?: boolean;
  opacity?: number;
  style?: ViewStyle;
  forwardedRef?: React.Ref<any>;
}

function Loading({ loading, opacity }: LoadingProps) {
  return loading ? (
    <View style={styles.container}>
      <View
        style={{
          ...styles.backdrop,
          opacity: opacity || 0.6,
        }}
      />
      <Spinner style={styles.spinner} />
    </View>
  ) : null;
}

const Forwarded = forwardRef<any, LoadingProps>((props, ref) => 
  <Loading {...props} forwardedRef={ref} />
);

const backdropStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
};

export const styles = StyleSheet.create({
  container: {
    ...backdropStyle,
    backgroundColor: 'transparent',
    // zIndex: activeTheme.zIndex.indicator, // TODO
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: backdropStyle,
  spinner: {
    // color: activeTheme.brandPrimary, // TODO
  },
});

export default connectToRedux({
  component: Forwarded,
  stateProps: (state: any) => ({
    loading: createLoadingSelector()(state),
    opacity: createOpacitySelector()(state),
  }),
}) as any;