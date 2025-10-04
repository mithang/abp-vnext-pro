import i18n from 'i18n-js';
import React, { forwardRef, ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

interface ValidationMessageProps extends TextProps {
  children?: string;
  forwardedRef?: any;
}

const ValidationMessage = ({ children, ...props }: ValidationMessageProps) =>
  children ? <Text style={styles} {...props}>{i18n.t(children)}</Text> : null;

const styles = {
  fontSize: 12,
  marginTop: 3,
  color: '#ed2f2f',
};

const Forwarded = forwardRef<any, ValidationMessageProps>((props, ref) => <ValidationMessage {...props} forwardedRef={ref} />);

export default Forwarded;
