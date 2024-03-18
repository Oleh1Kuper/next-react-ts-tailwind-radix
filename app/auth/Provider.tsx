'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => (
  <SessionProvider>
    {children}
  </SessionProvider>
);

export default AuthProvider;
