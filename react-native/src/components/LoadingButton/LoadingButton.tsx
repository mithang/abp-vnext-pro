import { Button, Spinner, IButtonProps } from 'native-base';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

interface LoadingButtonProps extends IButtonProps {
  loading?: boolean;
  children?: ReactNode;
}

export default function LoadingButton({ loading = false, style, children, ...props }: LoadingButtonProps) {
  return (
    <Button style={styles.button} {...props}>
      {children}
      {loading ? <Spinner /> : null}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { marginTop: 20, marginBottom: 30, height: 30 },
});