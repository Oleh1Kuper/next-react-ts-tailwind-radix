import React, { PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => (children
  ? <Text as="p" color="red">{children}</Text>
  : null);

export default ErrorMessage;
