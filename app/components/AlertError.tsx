import React, { ReactNode } from 'react';
import { Callout } from '@radix-ui/themes';
import { MdError } from 'react-icons/md';

type Props = {
  children: ReactNode;
}

const AlertError: React.FC<Props> = ({ children }) => (
  <Callout.Root color="red">
    <Callout.Icon>
      <MdError />
    </Callout.Icon>

    <Callout.Text>
      {children}
    </Callout.Text>
  </Callout.Root>
);

export default AlertError;
