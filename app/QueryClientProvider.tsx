'use client';

import React, { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';

type Props = {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<Props> = ({ children }) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
  </ReactQueryClientProvider>
);

export default QueryClientProvider;
