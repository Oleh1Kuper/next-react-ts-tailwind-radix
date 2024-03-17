import React from 'react';
import { Link as RedixLink } from '@radix-ui/themes';
import NextLink from 'next/link';

type Props = {
  href: string;
  children: string;
}

const Link: React.FC<Props> = ({ href, children }) => (
  <NextLink href={href} passHref legacyBehavior>
    <RedixLink>
      {children}
    </RedixLink>
  </NextLink>
);

export default Link;
